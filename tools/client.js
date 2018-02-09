const net = require('net');
const fs = require('fs');
const datasjson = fs.readFileSync("datas.json").toString();
const paramsjson = fs.readFileSync("param.json").toString();
const stations  = require('./stations.js');
let logger = require('js-logging').console();



function connServer(sn_key){
	let client = net.connect({port: stations.port,host:stations.server}, () => {
	  logger.info('connected to server!',sn_key);
	  setInterval(function(){
  		let cdata = datasjson.replace(/{{sn_key}}/g, sn_key).replace("{{sid}}",parseInt(sn_key.toString().substring(7)));
  		client.write(cdata);	
  		logger.info('send data', sn_key);
	  },60000);

	});
	client.on('data', (data) => {
	  let cdata = data.toString();
	  if(cdata.indexOf("StationPar") > -1){
	  	// 请求要参数
	  	let paramdata = paramsjson.replace(/{{sn_key}}/g, sn_key).replace("{{sid}}",parseInt(sn_key.toString().substring(7)));
  		client.write(paramdata);	
	  }
	  logger.info(data.toString());
	});
	client.on('end', () => {
	  logger.info('disconnected from server');
	});
}

logger.info(stations.from, stations.to);

for(let i = (stations.from); i < (stations.to); i++){
	logger.info('start to connServer', i);
	connServer(i);
}
