'use strict';
const net = require("net");
const CONFIG = require("./config");
var parse = require("./common/parse.js");
global.watchSite = require('./common/watchSite');
var parseData = parse.parseData;

var server = net.createServer(function(socket){
	socket.setTimeout(60000);
	var remoteAddress = socket.remoteAddress;
	console.log('socket remote address is'.magenta, remoteAddress.green);
	console.log('new client connected'.green);
	clients[remoteAddress] = {odata: ""};
	showConnections();
	socket.setKeepAlive(true);
	socket.on('connect', ()=>{
		clients[remoteAddress].odata = "";
		console.log(new Date(),'some one connect'.green);

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

		console.trace(err.error,err);
		socket.end();
	});

	socket.on('data', (data)=>{
		var record_time = new Date();
		var inputData = data.toString('utf8').replace(/\r\n/mg,"");
		clients[remoteAddress].odata += inputData;
		if(socket.sn_key){
			console.log((socket.sn_key+"收发数据中").green);	
		}
		parseData(clients[remoteAddress],socket);
	});

	socket.on('drain', ()=>{
		console.log(new Date(),'drain',socket.sn_key)
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
		console.log(new Date(),'socket timeout'.warn,socket.sn_key);
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
		console.log(new Date(),'client disconnect'.warn);
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
			console.log(new Date(),'current connections is'.magenta, num.toString().green);
		}else{
			console.log(err);
		}
	});
}

function clearSites(){
	var now = new Date(new Date()-1000*60*3);
	var nowString = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDate())+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	var nowCaution = new Date(new Date()-1000*60*5);
	var nowClearCautionString = nowCaution.getFullYear()+"-"+(nowCaution.getMonth()+1)+"-"+(nowCaution.getDate())+" "+nowCaution.getHours()+":"+nowCaution.getMinutes()+":"+nowCaution.getSeconds();
	var currentDate = new Date();
	var currentDateStr = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+(currentDate.getDate())+" "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
	conn.query('delete from tb_station_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_group_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_battery_module where record_time'+"<'"+nowString+"'");
	var clearSql = 'update my_alerts set status=4, markup="系统自动处理", markuptime="'+currentDateStr+'" where time<now()-500';
//	console.log('clear nowCaution', clearSql);
	conn.query(clearSql)

	// 清理系统报警
	conn.query('delete from systemalarm where station not in (select serial_number from my_site)');
}
var sendParamHard = require("./common/sendParam.js");
/**
 * 每隔30秒检查一次是否需要同步参数
 * 同步参数条件为
 * 在tb_station_module表中有数据
 * 但是在tb_station_param表中无数据
 */
function syncParams(){
    let sql = "select tb_station_module.sn_key,tb_station_module.CurSensor from tb_station_module where sn_key not in (select serial_number from my_site) ";
    console.log(sql);
    conn.query(sql, (err, results)=>{
        results.forEach((item)=>{
            sendParamHard('StationPar', {
                sn_key:item.sn_key.toString,
                CurSensor: item.CurSensor
            });
        });
    });
}

setInterval(clearSites,5000);
setInterval(showConnections,10000);
setInterval(syncParams,30000);

module.exports = {
	start:function(){
		server.listen(CONFIG.tcpserver);
		console.log(`tcp server start at port ${CONFIG.tcpserver.port}`.green);
	}
};
