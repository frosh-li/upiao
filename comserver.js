'use strict';
const net = require("net");
const CONFIG = require("./config");

var parse = require("./common/parse.js");
global.watchSite = require('./common/watchSite');
var parseData = parse.parseData;

var SerialPort = require("serialport");  //引入模块

global.com_sn = "";
const restartInterval = 1000 * 60 * 10;

function start(){
	global.serialPort = new SerialPort(CONFIG.com.name, CONFIG.com, function(error, ports){
		var remoteAddress = '127.0.0.1';
		serialPort.write(`<{"FuncSel":{"Operator":3}}>`);
		serialPort.on('data', (data)=>{
			var record_time = new Date();
			var inputData = data.toString('utf8').replace(/\r\n/mg,"");
			console.log(inputData);
			comClients[remoteAddress].odata += inputData;
			if(com_sn){
				logger.info((com_sn+" receive"));
			}
			parseData(comClients[remoteAddress],serialPort);
		});
		serialPort.on('error', function(err){
			comClients[remoteAddress].odata = "";
			com_sn = "";
			logger.info(`serialPort error ${err.message}`.red);
			setTimeout(()=>{
				start();
			}, 1000);
		});
		serialPort.on('close', function(err){
			com_sn = "";
			comClients[remoteAddress].odata = "";
			logger.info(`serialPort error closed`.red);
			logger.info("1s后重新打开串口");
			setTimeout(()=>{
				start();
			}, 1000);
		});
		// setTimeout(()=>{
		// 	serialPort.close(()=>{
		// 		logger.info('serialPort closed'.green);
		// 	})
		// }, restartInterval)
	});
}



function showConnections(){
	server.getConnections(function(err, num){
		if(!err){
			logger.info('current connections is', num.toString());
		}else{
			logger.info(err);
		}
	});
}

var sendParamHard = require("./common/sendParam.js");
/**
 * 每隔30秒检查一次是否需要同步参数
 * 同步参数条件为
 * 在tb_station_module表中有数据
 * 但是在tb_station_param表中无数据
 */
function syncParams(){
    let sql = "select tb_station_module.sn_key,tb_station_module.CurSensor from tb_station_module where sn_key not in (select sn_key from tb_station_param) ";
    logger.info(sql);
    conn.query(sql, (err, results)=>{
    	if(err){
    		console.log(err);
    		return;
    	}
        results.forEach((item)=>{
            sendParamHard('StationPar', {
                sn_key:item.sn_key.toString(),
                CurSensor: item.CurSensor
            });
        });
    });
}

setInterval(watchSite.clearSites,10000);
// setInterval(showConnections,10000);
setInterval(syncParams,30000);

//setInterval(checkAlert, 10000);

//var player = require('./libs/playsound.js');
/*
function checkAlert(){
	logger.info('play sound alert');
	let sql = "select count(*) as totals from my_alerts where status = 0";
	conn.query(sql, (err, ret) => {
		if(err){
			return;
		}
		if(ret && ret[0] && ret[0].totals > 0){
			logger.info('has sound alert')
			player.playing == false &&player.stop()&& player.play();
		}else{
			let sql2 = "select count(*) as ctotals from systemalarm";
			conn.query(sql2, (err, ret2) => {
				if(err){
					return;
				}
				if(ret2 && ret2[0] && ret2[0].ctotals > 0){
					logger.info('has system sound alert')
					player.playing == false &&player.stop()&& player.play();
				}else{
					player.stop();
				}
			})
		}
	})
}
*/
module.exports = {
	start:function(){
		start();
		logger.info(`com server start at port COM1`.green);
	}
};
