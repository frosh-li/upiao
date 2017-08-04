'use strict';

var station = require('../libs/station');
var group = require('../libs/group');
var battery = require('../libs/battery');

var sendmsgFunc = require('../sendmsg/');

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
					climit:StationErr.limits["Limit_"+key] || 0
				})
			}
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
					climit:GroupErr.limits["Limit_"+key] || 0
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
					climit:BatteryErr.limits["Limit_"+key] || 0
				})
			}
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
				sendMsg(item);
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


function sendMsg(item){
	new Promise((resolve, reject)=>{
		conn.query("select sms_on_off from my_config where sms_on_off='s:1:\"1\";'", function(err, res){
			if(err){
				return;
			}
			if(res && res.length > 0){


			conn.query(`select * from my_station_alert_desc where en='${item.code}' and my_station_alert_desc.type='${item.type}'`, function(err, res){
				if(err){
					console.log('sendmsg error',err,item);
				}else{
					var msgContent = res[0]['desc'];
					if(res[0].send_msg == 0){
						// 不需要发送短信
						console.log('报警不需要发送短信',msgContent);
						return;
					}

					conn.query(`select site_name,sid,functionary_phone,functionary_sms from my_site where serial_number=${item.sn_key.substring(0,10)+"0000"}`, function(err, result){
						if(err){
							console.log('get data from site error', err);
							return;
						}
						if(result && result.length > 0){
							var mobile = result[0]['functionary_phone'];
							var ifsendmsg = result[0]['functionary_sms'];
							if(!ifsendmsg){
								// 不需要发送短信
								console.log("站点设置成不发送短信",msgContent);
								return;
							}
							if(/^[0-9]{11}$/.test(mobile)){
								msgContent += ",站点:"+result[0]['site_name']+",站号:"+result[0]['sid'];
								msgContent += ",组号:"+item.sn_key.substr(10,2);
								msgContent += ",电池号:"+item.sn_key.substr(12,2);
								console.log('发送短信', mobile, msgContent);
								sendmsgFunc(mobile,msgContent);
							}else{
								console.log('手机格式错误', mobile);
							}
							
						}
					})
					// functionary_phone  functionary_sms
					// 检查站点设置中这条记录是否需要发送短信
					
					// sendmsgFunc()
				}
			})
		}else{
				console.log('全局设置不需要发送短信');
			}
		})
	})
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
