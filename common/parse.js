'use strict';

var station = require('../libs/station');
var group = require('../libs/group');
var battery = require('../libs/battery');

const Utils = require("./utils.js");

var errCode = require('../libs/errorConfig');

var params = require("../libs/params");

function commonErrorDeal(err){
	if(err){
		logger.info('heart beat error', err);
	}
}

var dealData = function(str, socket){
	var record_time = new Date();
	try{
		str = JSON.parse(str);
	}catch(e){
		// 如果出错清空之前的缓存数据
		logger.info('error---------------');
		logger.info(str);
		socket.odata = "";
		return;
	}

	if(/^\{\"sn_key\"\:\"[0-9]{14}\",\"sid\"\:[0-9]+\}$/.test(JSON.stringify(str))){
		logger.info('heart beat', JSON.stringify(str));
		let sn_key = str.sn_key;
		// 开始更新所有的station数据
		conn.query("update tb_station_module set record_time=? where sn_key=?",[record_time, sn_key],commonErrorDeal);
		// 开始更新所有的battery数据
		conn.query("update tb_group_module set record_time=? where floor(sn_key/10000)=?",[record_time, Math.floor(sn_key/10000)],commonErrorDeal);
		// 开始更新所有的battery数据
		conn.query("update tb_battery_module set record_time=? where floor(sn_key/10000)=?",[record_time, Math.floor(sn_key/10000)],commonErrorDeal);

	}

	// logger.info(str);
	if(str&&str.StationData){
		station.deal(str.StationData, record_time);
		if(str.StationData && str.StationData.sn_key){
			socket.sn_key = str.StationData.sn_key;
			sockets[socket.sn_key] = socket;
			logger.info('parse data from ',socket.sn_key)
		}else{
			logger.info('can not parse data')
		}
	}

	if(str && str.ResistorVal){
		logger.info('内阻返回值');
		logger.info(str);
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
				logger.info(err);
			}else{
				logger.info('内阻采集成功', obj);
			}
		});
	}


	if(str && str.StationPar){
		// 如果是参数，处理参数
		logger.info(str);
		params.update(str);
	}
	if(str && str.GroupData){
		group.deal(str.GroupData,record_time,str.StationData.sid);
	}
	if(str && str.BatteryData){
		battery.deal(str.BatteryData,record_time,str.StationData.sid);
	}

	if(str && (str.StationErr || str.GroupErr || str.BatteryErr)){
		logger.info(str.StationErr);
		let StationErr = str.StationErr;
		let errorInsert = [];
		let sn_key = '';
		if(StationErr){
			let type="station";
			for(var key in StationErr.errors){
				sn_key = StationErr.sn_key;
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
			sn_key = GroupErr.sn_key.substring(0,10)+'0000';
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
			sn_key = BatteryErr.sn_key.substring(0,10)+'0000';
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
		logger.info('erroritem',JSON.stringify(errorInsert));
		logger.info('报警条数为',errorInsert.length);
		if(errorInsert.length > 0){
			insertErrorBulk(errorInsert);
		}
		// 如果有报警信息，进行报警
		// 报警之后进行处理  类型心跳处理机制
		// 开始更新所有的station数据

		conn.query("update tb_station_module set record_time=? where sn_key=?",[record_time, sn_key],commonErrorDeal);
		// 开始更新所有的battery数据
		conn.query("update tb_group_module set record_time=? where floor(sn_key/10000)=?",[record_time, Math.floor(sn_key/10000)],commonErrorDeal);
		// 开始更新所有的battery数据
		conn.query("update tb_battery_module set record_time=? where floor(sn_key/10000)=?",[record_time, Math.floor(sn_key/10000)],commonErrorDeal);
	}
}

function insertErrorBulk(data){
	let item = data.shift();
	logger.info('erroritem'+JSON.stringify(item))
	if(item){
        // 如果是忽略狀態不加入數據
        Promise.all([
            Service.getAlertsByStatus(item.sn_key, item,code, 2),
            Service.getAlertsByStatus(item.sn_key, item,code, 0),
        ]).then(result => {
            let [ignore, hasSame] = result;
            return new Promise((resolve, reject) => {
                if(ignore !== false){
                    return reject(new Error("已经忽略"));
                }
                return resolve(hasSame);
            })
        }).then(_ => {
			logger.info('erroritem updatr or insert', JSON.stringify(_));
            Service.InsertOrUpdateError(_,item)
                .then(() => {
                    insertErrorBulk();
                }).catch(e => {
                    logger.info(e);
                })
		}).catch(function(err){
			if(err){
				if(err.messeage == "ignored"){
					return;
				}else{
					logger.info(err);
				}

			}
			insertErrorBulk(data);
		})
	}
}


function sendMsg(item){
	new Promise((resolve, reject)=>{
        Promise.all([
            Service.getAlertSetting(),
            Service.getAlertDesc(item),
        ]).then(res => {
            let needSendMsg = res[0];
            if(needSendMsg){
                let alertDesc = res[1];
                let msgContent = alertDesc['desc'];
                if(alertDesc.send_msg == 0){
                    // 不需要发送短信
                    logger.info('报警不需要发送短信',msgContent);
                    return;
                }
                // 发送掉站短信
                Service.getSiteInfo(sn_key)
                    .then(result => {
                        if(result && result.length > 0){
                            msgContent += ",数值:"+item['current'];
                            msgContent += ",参考值:"+item['climit'];
                            msgContent += ",站点:"+result[0]['site_name']+",站号:"+result[0]['sid'];
                            msgContent += ",组号:"+item.sn_key.substr(10,2);
                            msgContent += ",电池号:"+item.sn_key.substr(12,2);
                            Utils.sendMsg(result, msgContent)
                        }else{
                            logger.info('获取站点信息失败', sn_key);
                        }
                    })
                    .catch((e) => {
                        logger.info('get data from site error', err);
                    });
            }
        })
        .catch(e => {
            logger.info(e);
        })
	})
}


function parseData(socket){
	// logger.info('start parse data', socket.odata);
	if(/<[^>]*>/.test(socket.odata)){
	   //如果有數據直接處理
	   var omatch = socket.odata.match(/^<[^>]*>/)[0];
	   logger.info('omatch',omatch);
	   let fullString = omatch;
	   dealData(fullString.replace(/[<>]/g,""), socket);
	   socket.odata = socket.odata.replace(fullString,"");
	   parseData(socket);
	}else{
		if(socket.odata.length > 20000){
			// 数据过多，并且无法解析，断开连接重新来
			socket.end();
			logger.info("close connection 因为数据过多，并且无法解析")
		}
		// logger.info('no match');
	}
}

module.exports = {
	parseData: parseData,
	dealData: dealData
}
