'use strict';
const net = require("net");
const CONFIG = require("./config");

var parse = require("./common/parse.js");
global.watchSite = require('./common/watchSite');
var parseData = parse.parseData;

var server = net.createServer(function(socket){
	socket.setTimeout(60000);
	var remoteAddress = socket.remoteAddress;
	logger.info('socket remote address is'.magenta, remoteAddress.green);
	logger.info('new client connected'.green);
	clients[remoteAddress] = {odata: ""};
	showConnections();
	socket.setKeepAlive(true);
	console.log('bytesRead',socket.bytesRead);
        console.log('bytesWritten',socket.bytesWritten); 
	socket.write(`<{"FuncSel":{"Operator":3}}>`);
	socket.on('connect', ()=>{
		clients[remoteAddress].odata = "";
	});
	socket.on('error', (err)=>{
		for(var key in clients){
			if(socket == clients[key]){
				delete clients[key];
			}
		}
		if(socket && socket.sn_key){
			delete sockets[socket.sn_key];
		}
		socket.destroy();

		watchSite.disConnectSite(socket.sn_key);

		logger.debug('end connect from error',err.error,err);
		socket.end();
	});

	socket.on('data', (data)=>{
		console.log(data.toString('utf8'));
		var record_time = new Date();
		var inputData = data.toString('utf8').replace(/\r\n/mg,"");
		console.log(inputData);
		clients[remoteAddress].odata += inputData;
		if(socket.sn_key){
			logger.info((socket.sn_key+" receive"));	
		}
		parseData(clients[remoteAddress],socket);
	});

	socket.on('drain', ()=>{
		logger.info(new Date(),'drain',socket.sn_key)
	})

	socket.on('timeout', ()=>{

		for(var key in clients){
			if(socket == clients[key]){
				delete clients[key];
			}
		}
		if(socket && socket.sn_key){
			delete sockets[socket.sn_key];
		}

		socket.destroy();
		watchSite.disConnectSite(socket.sn_key);
		logger.alert('socket timeout',socket.sn_key);
		socket.end();
	});

	socket.on('end', (data)=>{
		for(var key in clients){
			if(socket == clients[key]){
				delete clients[key];
			}
		}
		if(socket && socket.sn_key){
			delete sockets[socket.sn_key];
		}
		logger.info(' from end client disconnect');
		watchSite.disConnectSite(socket.sn_key);
		showConnections();
	})
});

server.on('error', (err) => {
  throw err;
});

server.listen(CONFIG.tcpserver);


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
setInterval(showConnections,10000);
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
		server.listen(CONFIG.tcpserver);
		logger.info(`tcp server start at port ${CONFIG.tcpserver.port}`.green);
	}
};
