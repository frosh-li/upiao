'use strict';
const net = require("net");
global.colors = require('colors');
var mysql = require('mysql');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});
global.conn = mysql.createConnection({
	// host     : '10.1.219.81',
	host     : '127.0.0.1',
	user     : 'root',
	password : '',
	database : 'db_bms_english4',
	multipleStatements: true,
	dateStrings:true
});

var station = require('./libs/station');
var group = require('./libs/group');
var battery = require('./libs/battery');

var errCode = require('./libs/errorConfig');

var dealData = function(str){
	var record_time = new Date();
	str = JSON.parse(str);
	// console.log(str);
	if(str&&str.StationData){
		station.deal(str.StationData, record_time);
	}
	if(str && str.GroupData){
		group.deal(str.GroupData,record_time,str.StationData.sid);
	}
	if(str && str.BatteryData){
		battery.deal(str.BatteryData,record_time,str.StationData.sid);
	}

	if(str && (str.StationErr || str.GroupErr || str.BatteryErr)){
		console.log('has error'.green);
		let StationErr = str.StationErr;
		let errorInsert = [];
		if(StationErr){
			let type="station";

			for(let key in errCode[type]){
				console.log(key, StationErr[key]);
				if(StationErr[key] !== undefined){
					let current = StationErr[errCode[type][key][0]];
					let code = errCode[type][key][StationErr[key]];
					errorInsert.push({
						type:type,
						sn_key:StationErr.sn_key,
						code:code,
						current:current
					})
				}
			}

		}

		let GroupErr = str.GroupErr;
		str.GroupErr && str.GroupErr.forEach(function(GroupErr){
			let type="group";

			for(let key in errCode[type]){
				console.log(key, GroupErr[key]);
				if(GroupErr[key] !== undefined){
					let current = GroupErr[errCode[type][key][0]];
					let code = errCode[type][key][GroupErr[key]];
					errorInsert.push({
						type:type,
						sn_key:GroupErr.sn_key,
						code:code,
						current:current
					})
				}
			}

		})


		let BatteryErr = str.BatteryErr;

		str.BatteryErr && str.BatteryErr.forEach(function(BatteryErr){


			let type="battery";

			for(let key in errCode[type]){
				console.log(key, BatteryErr[key]);
				if(BatteryErr[key] !== undefined){
					let current = BatteryErr[errCode[type][key][0]];
					let code = errCode[type][key][BatteryErr[key]];
					errorInsert.push({
						type:type,
						sn_key:BatteryErr.sn_key,
						code:code,
						current:current
					})
				}
			}

		})
		console.log(errorInsert);
		if(errorInsert.length > 0){
			insertErrorBulk(errorInsert);
		}
		// 如果有报警信息，进行报警
	}
}

function insertErrorBulk(data){
	var item = data.shift();
	if(item){
		new Promise(function(resolve, reject){
			// 如果是忽略狀態不加入數據
			var sql = `select * from my_alerts where
			 status=2 and 
			 sn_key='${item.sn_key}' and 
			 code='${item.code}'`;
			conn.query(sql, function(err, ret){
				if(err){
					return reject(err);
				}
				if(ret && ret.length > 0){
					return reject(new Error('ignored'));
				}else{
					return resolve('ok');
				}
			});
		}).then(function(){
			// 查看是否已經存在相同記錄並且沒有處理過
			return new Promise(function(resolve, reject){
				var sql = `
					select * from my_alerts where
					status != 2 and
					sn_key = '${item.sn_key}' and
					code = '${item.code}'
				`;
				conn.query(sql, function(err, ret){
					if(err){
						return reject(err);
					}
					if(ret && ret.length > 0 ){
						return resolve('update');
					}else{
						return resolve('insert');
					}
				})
			})
			
		}).then(function(_){
			console.log('update or insert', _);
			var sql;
			if(_ == 'update'){
				sql = `update my_alerts 
					set
					current=?,
					time=?
					where sn_key=?
					and
					code=?
				`;
			}else{
				sql = "insert into my_alerts set ?";
			}
			var obj = [
				item.current,
				new Date(),
				item.sn_key,
				item.code
			];
			conn.query(sql, _=='insert'?item:obj, function(err, results){
				if(err){
					console.log('insert error error', err);
				}else{
					console.log('insert error done'.green);
				}
				insertErrorBulk(data);
			})
		}).catch(function(err){
			if(err){
				console.log(err);
			}
			insertErrorBulk(data);
		})
	}
}


global.clients = {};

function parseData(client){
	console.log('start parse data');
	if(/^<[^>]*>/.test(client.odata)){
	   //如果有數據直接處理
	   var omatch = client.odata.match(/^<[^>]*>/)[0];
	   //console.log('omatch',omatch);
	   let fullString = omatch;
	   dealData(fullString.replace(/[<>]/g,""));
	   client.odata = client.odata.replace(fullString,"");
	   parseData(client);
	}else{
		console.log('no match');
	}
}

var server = net.createServer(function(socket){

	var remoteAddress = socket.remoteAddress;
	console.log('socket remote address is'.magenta, remoteAddress.green);
	console.log('new client connected'.green);
	clients[remoteAddress] = {odata: ""};
	showConnections();
	socket.on('connect', ()=>{
		clients[remoteAddress].odata = ""

		console.log('some one connect'.green);
	});
	socket.on('error', (err)=>{
		console.log(err.error);
	});

	socket.on('data', (data)=>{
		var record_time = new Date();
		var inputData = data.toString('utf8').replace(/\r\n/mg,"");
		clients[remoteAddress].odata += inputData;
		parseData(clients[remoteAddress]);
		
		

		// if(cmdOrder == 2){
		// 	//解析成对应的站号信息
		// 	// 并存入到整个大对象中
		// 	clients[data.readUIntLE(4,4).toString()] = socket;
		// 	console.log('MAC Address:'.magenta,data.readUIntLE(4,4).toString().green,'站号为:'.magenta,data.readUInt16LE(8).toString().green);
		// }else if(cmdOrder == 8){
		// 	// 获取整站监测数据
		// 	stationModule.parse(data, record_time);
		// 	groupModule.parse(data, record_time);
		// 	batteryModule.parse(data, record_time);
		// }else if(cmdOrder == 6){
		// 	// 收到回复的站点参数
		// }
		// setTimeout(()=>{
		// 	socket.write(config.askBuffer);
		// },10000);
	});

	socket.on('timeout', ()=>{
		console.log('socket timeout'.warn);
	});

	socket.on('end', (data)=>{
		for(var key in clients){
			if(socket == clients[key]){
				delete clients[key];
			}
		}
		console.log('client disconnect'.warn);
		showConnections();
		return;
	})
});

server.listen({
	port: 60026,
	exclusive: true
});

function showConnections(){
	server.getConnections(function(err, num){
		if(!err){
			console.log('current connections is'.magenta, num.toString().green);
		}
	});
}
