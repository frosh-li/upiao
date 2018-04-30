'use strict';
const net = require("net");
const CONFIG = require("./config");

const parse = require("./common/parse.js");
const Utils = require("./common/utils.js");
const Command = require("./constants/command.js");
const Service = require("./services/service.js");
global.watchSite = require('./common/watchSite');
const parseData = parse.parseData;

const server = net.createServer(function(socket){
	// 设置超时
	socket.setTimeout(60000);
	socket.setKeepAlive(true);
	logger.info('init:bytesRead',socket.bytesRead);
    logger.info('init:bytesWritten',socket.bytesWritten);

	let remoteAddress = socket.remoteAddress;
	clients[remoteAddress] = {odata: ""};
	socket.odata = "";
	logger.info('socket remote address is'.magenta, remoteAddress.green);
	logger.info('new client connected'.green);
	// 请求一次所有站数据
	socket.write(Command.stationData);

	socket.on('connect', () => {
		clients[remoteAddress].odata = "";
	    socket.odata = ""
	});

	socket.on('data', (data) => {
		var record_time = new Date();
		var inputData = data.toString('utf8').replace(/\r\n/mg,"");
		logger.info(inputData);
		clients[remoteAddress].odata += inputData;
	    socket.odata += inputData;
		if(socket.sn_key){
			logger.info((socket.sn_key+" receive"));
		}
		parseData(socket);
	});

	socket.on('drain', () => {
		logger.info(new Date(),'drain',socket.sn_key)
	});

	socket.on('error', (err) => {
		Utils.disConnectSocket(socket, "error", err);
	});

	socket.on('timeout', () => {
		Utils.disConnectSocket(socket, "timeout");
	});

	socket.on('end', (data) => {
		Utils.disConnectSocket(socket, "end");
	})
});

server.on('error', (err) => {
  throw err;
});

setInterval(()=>{
	Service.clearSites()
},10000);
/**
 * 10秒显示一次连接数
 */
setInterval(()=>{
	Utils.showConnections(server)
},10000);
/**
 * 30秒同步一次参数
 */
setInterval(Utils.syncParams,30000);

module.exports = {
	start:function(){
		server.listen(CONFIG.tcpserver);
		logger.info(`tcp server start at port ${CONFIG.tcpserver.port}`.green);
	}
};
