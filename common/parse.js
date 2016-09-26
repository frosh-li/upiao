'use strict';

var station = require('../libs/station');
var group = require('../libs/group');
var battery = require('../libs/battery');

var errCode = require('../libs/errorConfig');

var dealData = function(str, socket){
	var record_time = new Date();
	str = JSON.parse(str);
	// console.log(str);
	if(str&&str.StationData){
		station.deal(str.StationData, record_time);
		if(str.StationData && str.StationData.sn_key){
			socket.sn_key = str.StationData.sn_key;
			sockets[socket.sn_key] = socket;
		}
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


function parseData(client, socket){
	console.log('start parse data');
	if(/^<[^>]*>/.test(client.odata)){
	   //如果有數據直接處理
	   var omatch = client.odata.match(/^<[^>]*>/)[0];
	   //console.log('omatch',omatch);
	   let fullString = omatch;
	   dealData(fullString.replace(/[<>]/g,""), socket);
	   client.odata = client.odata.replace(fullString,"");
	   parseData(client, socket);
	}else{
		console.log('no match');
	}
}

module.exports = {
	parseData: parseData,
	dealData: dealData
}
