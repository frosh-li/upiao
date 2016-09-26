'use strict';
const net = require("net");
const CONFIG = require("./config");
var parse = require("./common/parse.js");
var parseData = parse.parseData;

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
		parseData(clients[remoteAddress],socket);
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
		if(socket && socket.sn_key){
			delete sockets[socket.sn_key];
		}
		console.log('client disconnect'.warn);
		showConnections();
		return;
	})
});

server.listen(CONFIG.tcpserver);

function showConnections(){
	server.getConnections(function(err, num){
		if(!err){
			console.log('current connections is'.magenta, num.toString().green);
		}
	});
}

module.exports = {
	start:function(){
		server.listen(CONFIG.tcpserver);
		console.log(`tcp server start at port ${CONFIG.tcpserver.port}`.green);
	}
};
