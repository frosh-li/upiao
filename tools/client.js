const net = require('net');
const fs = require('fs');
const datasjson = fs.readFileSync("datas.json").toString();
const paramsjson = fs.readFileSync("param.json").toString();
const stations  = require('./stations.js');



function connServer(sn_key){
	let client = net.connect({port: stations.port,host:stations.host}, () => {
	  console.log('connected to server!',sn_key);
	  setInterval(function(){
  		let cdata = datasjson.replace(/{{sn_key}}/g, sn_key).replace("{{sid}}",parseInt(sn_key.toString().substring(7)));
  		client.write(cdata);	
  		console.log('send data', sn_key);
	  },60000);

	});
	client.on('data', (data) => {
	  let cdata = data.toString();
	  if(cdata.indexOf("StationPar") > -1){
	  	// 请求要参数
	  	let paramdata = paramsjson.replace(/{{sn_key}}/g, sn_key).replace("{{sid}}",parseInt(sn_key.toString().substring(7)));
  		client.write(paramdata);	
	  }
	  console.log(data.toString());
	});
	client.on('end', () => {
	  console.log('disconnected from server');
	});
}

console.log(stations.from, stations.to);

for(let i = (stations.from); i < (stations.to); i++){
	console.log('start to connServer', i);
	connServer(i);
}