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
		socket.destroy();
		watchSite.disConnectSite(socket.sn_key);
		console.trace(err.error,err);
	});

	socket.on('data', (data)=>{
		var record_time = new Date();
		var inputData = data.toString('utf8').replace(/\r\n/mg,"");
		clients[remoteAddress].odata += inputData;
		parseData(clients[remoteAddress],socket);
	});

	socket.on('drain', ()=>{
		console.log(new Date(),'drain',socket.sn_key)
	})

	socket.on('timeout', ()=>{
		socket.destroy();
		watchSite.disConnectSite(socket.sn_key);
		console.log(new Date(),'socket timeout'.warn,socket.sn_key);
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
			console.log(new Date(),'current connections is'.magenta, num.toString().green,clients);
		}else{
			console.log(err);
		}
	});
}

function clearSites(){
	var now = new Date(new Date()-1000*60);
	var nowString = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDate())+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	conn.query('delete from tb_station_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_group_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_battery_module where record_time'+"<'"+nowString+"'");
}

setInterval(clearSites,5000);
setInterval(showConnections,10000);

module.exports = {
	start:function(){
		server.listen(CONFIG.tcpserver);
		console.log(`tcp server start at port ${CONFIG.tcpserver.port}`.green);
	}
};
