'use strict';

var station = require('../libs/station');
var group = require('../libs/group');
var battery = require('../libs/battery');

var errCode = require('../libs/errorConfig');

var params = require("../libs/params");

var dealData = function(str, socket){
	var record_time = new Date();
	try{
		str = JSON.parse(str);	
	}catch(e){
		console.log('error---------------');
		console.log(str);
		return;
	}
	
	// console.log(str);
	if(str&&str.StationData){
		station.deal(str.StationData, record_time);
		if(str.StationData && str.StationData.sn_key){
			socket.sn_key = str.StationData.sn_key;
			sockets[socket.sn_key] = socket;
			console.log('parse data from ',socket.sn_key)
		}else{
			console.log('can not parse data')
		}
	}

	if(str && str.ResistorVal){
		console.log('内阻返回值');
		console.log(str);
		// { ResistorVal: [ { sn_key: '11611061050101', Resistor: 10.6 } ] }
		let R = str.ResistorVal[0].Resistor;
		let sn_key = str.ResistorVal[0].sn_key;
		var obj = {
			stationid:sn_key.substring(0,10) + "0000",
			groupid:sn_key.substring(10,12),
			batteryid:sn_key.substring(12,14),
			R:R
		}
		conn.query(`insert into my_collect set ?`, obj, function(err, res){
			if(err){
				console.log(err);
			}else{
				console.log('内阻采集成功', obj);
			}
		});
	}

	
	if(str && str.StationPar){
		// 如果是参数，处理参数
		console.log(str);
		params.update(str);
	}
	if(str && str.GroupData){
		group.deal(str.GroupData,record_time,str.StationData.sid);
	}
	if(str && str.BatteryData){
		battery.deal(str.BatteryData,record_time,str.StationData.sid);
	}

	if(str && (str.StationErr || str.GroupErr || str.BatteryErr)){
		console.log(str.StationErr);
		let StationErr = str.StationErr;
		let errorInsert = [];
		if(StationErr){
			let type="station";
			for(var key in StationErr.errors){
				if(key.startsWith("Limit")){
					continue;
				}
				errorInsert.push({
					type:type,
					sn_key:StationErr.sn_key,
					code:key,
					current:StationErr.errors[key],
					time:new Date(),
					climit:StationErr.errors["Limit_"+key] || 0
				})
			}
			// for(let key in errCode[type]){
			// 	console.log(key, StationErr[key]);
			// 	if(StationErr[key] !== undefined){
			// 		let current = StationErr[errCode[type][key][0]];
			// 		let code = errCode[type][key][StationErr[key]];
			// 		errorInsert.push({
			// 			type:type,
			// 			sn_key:StationErr.sn_key,
			// 			code:code,
			// 			current:current
			// 		})
			// 	}
			// }

		}

		let GroupErr = str.GroupErr;
		str.GroupErr && str.GroupErr.forEach(function(GroupErr){
			let type="group";
			for(var key in GroupErr.errors){
				if(key.startsWith("Limit")){
					continue;
				}
				errorInsert.push({
					type:type,
					sn_key:GroupErr.sn_key,
					code:key,
					time:new Date(),
					current:GroupErr.errors[key],
					climit:GroupErr.errors["Limit_"+key] || 0
				})
			}

		})


		let BatteryErr = str.BatteryErr;

		str.BatteryErr && str.BatteryErr.forEach(function(BatteryErr){


			let type="battery";
			for(var key in BatteryErr.errors){
				if(key.startsWith("Limit")){
					continue;
				}
				errorInsert.push({
					type:type,
					sn_key:BatteryErr.sn_key,
					code:key,
					time:new Date(),
					current:BatteryErr.errors[key],
					climit:BatteryErr.errors["Limit_"+key] || 0
				})
			}
			// for(let key in errCode[type]){
			// 	console.log(key, BatteryErr[key]);
			// 	if(BatteryErr[key] !== undefined){
			// 		let current = BatteryErr[errCode[type][key][0]];
			// 		let code = errCode[type][key][BatteryErr[key]];
			// 		errorInsert.push({
			// 			type:type,
			// 			sn_key:BatteryErr.sn_key,
			// 			code:code,
			// 			current:current
			// 		})
			// 	}
			// }

		})
		// console.log(errorInsert);
		console.log('报警条数为',errorInsert.length);
		if(errorInsert.length > 0){
			insertErrorBulk(errorInsert);
		}
		// 如果有报警信息，进行报警
	}
}

function insertErrorBulk(data){
	var item = data.shift();
	//console.log(item)
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
					// console.log('ignored');
					return reject('ignored');
				}else{
					return resolve('ok');
				}
			});
		}).then(function(){
			// 查看是否已經存在相同記錄並且沒有處理過
			return new Promise(function(resolve, reject){
				var sql = `
					select * from my_alerts where
					status = 0 and
					sn_key = '${item.sn_key}' and
					code = '${item.code}'
				`;
				conn.query(sql, function(err, ret){
					if(err){
						return reject(err);
					}
					if(ret && ret.length > 0 ){
						return resolve(ret[0]);
					}else{
						return resolve('insert');
					}
				})
			})
			
		}).then(function(_){
			// console.log('update or insert', _);
			var sql;
			if(_ != 'insert'){
				sql = `update my_alerts 
					set
					current=?,
					time=?,
					climit=?
					where id=${_.id}
				`;
			}else{
				sql = "insert into my_alerts set ?";
			}
			var obj = [
				item.current,
				new Date(),
				item.climit,
				item.sn_key,
				item.code
			];
			conn.query(sql, _=='insert'?item:obj, function(err, results){
				if(err){
					console.log('insert error error', err);
				}else{
					// console.log('insert error done'.green);
				}
				insertErrorBulk(data);
			})
		}).catch(function(err){
			if(err){
				if(err.messeage == "ignored"){
					return;
				}else{
					console.log(err);	
				}
				
			}
			insertErrorBulk(data);
		})
	}
}


function parseData(client, socket){
	// console.log('start parse data');
	if(/^<[^>]*>/.test(client.odata)){
	   //如果有數據直接處理
	   var omatch = client.odata.match(/^<[^>]*>/)[0];
	   //console.log('omatch',omatch);
	   let fullString = omatch;
	   dealData(fullString.replace(/[<>]/g,""), socket);
	   client.odata = client.odata.replace(fullString,"");
	   parseData(client, socket);
	}else{
		// console.log('no match');
	}
}

module.exports = {
	parseData: parseData,
	dealData: dealData
}
