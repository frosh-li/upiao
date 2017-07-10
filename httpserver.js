const http = require('http');
const CONFIG = require('./config.js');
const url = require("url");
const querystring = require("querystring");
var sendParamHard = require("./common/sendParam.js");
var routes = [
	{
		method:"GET",
		path:"/getparam",
		func: GetParam
	},
	{
		method:"POST",
		path:"/setparam",
		func:SetParam
	},
	{
		method:"POST",
		path:"/updateServer",
		func:UpdateServer
	},
	{
		method:"GET",
		path:"/allclients",
		func:AllClients
	},
	{
		method:"POST",
		path:"/irc",
		func:ircollect
	}
];
const server = http.createServer((req, res) => {
	res.json = function(str){
		res.end(JSON.stringify(str));
	}
	res.setHeader('Content-Type', 'application/json');
	res.setHeader("Access-Control-Allow-Origin","*");

	console.log(req.method);
	console.log(req.url);
	var method = req.method;
	var urlparse = url.parse(req.url);
    var cfunc = null;
	for(var i = 0 ; i < routes.length ; i++){
		var route = routes[i];
		if(route.method == method && route.path == urlparse.pathname){
			cfunc = route.func;
			break;
		}
	}
	if(!cfunc){
		return res.json({status:400, msg:'can not find the route'});
	}
	req.body = [];
	req.query = querystring.parse(urlparse.query);

	req.on("data", function(chunk){
		req.body += chunk;
	});
	req.on("end", function(){
		req.body = querystring.parse(req.body);
		cfunc.call(null, req, res);
	})
});
const { exec } = require('child_process');
function UpdateServer(req, res){
	exec("git pull", {cwd:"/Applications/XAMPP/xamppfiles/htdocs"}, function(err, stdout, stderr){
		console.log('git update',err, stdout, stderr);
		return res.json({status:200});
	})
}

function GetParam(req, res){
	res.json({status:200, msg:"get param", query: req.query});
}

function SetParam(req, res){
	if(req.method.toUpperCase() !== "POST"){
		return res.json({status:400, msg:"method need to be post"});
	}
	sendParamHard(req.query.type, req.body);
	res.json({response:{code:0,msg:"set param done", query: req.query,body:req.body}});
}


function stepCol(batterys,sn_key){
	var bat = batterys.shift();
	if(!bat){
		console.log('所以采集完成',sn_key);
		return;
	}
	var towrite = `<{"FuncSel":{"Operator": 130, "00":${parseInt(bat.substring(10,12))},"01":${parseInt(bat.substring(12,14))},"02":21,"03":0}}>`;
		// 00 第一组
		// 01 组内编号
		// 02 操作码 21
		// 03 0

		console.log(towrite.toString())
		sockets[sn_key].write(towrite.toString());	
		setTimeout(function(){
			stepCol(batterys, sn_key);	
		}, 2500);
		
}

// <{"WhatTime": {  "sn_key":"11611061050000",  "sid": 9 }}>  请求时间
function ircollect(req, res){
	console.log('start to 内阻采集');
	console.log(req.body.batterys);
  	var batterys = req.body.batterys.split(",");
	var sn_key = batterys[0].substring(0,10)+"0000";
		console.log('开始请求内阻采集',sn_key);
	console.log(sockets[sn_key]);
	if(sockets[sn_key]){
		console.log('开始请求内阻采集',sn_key);
		console.log('batterys', batterys);

		stepCol(batterys, sn_key);
		// batterys.forEach(function(bat){
			
	
		// })
	}	
	res.json({
		status:200,
		batterys: req.body.batterys.split(",")
	})
}

function AllClients(req, res){
	res.json({status:200, msg:"get allclient", clients: clients});
}

server.on('clientError', (err, socket) => {
	  socket.end('{"status":400, "msg":"client error"}');
});

module.exports = {
	start : function(){
		server.listen(CONFIG.httpserver.port);
		console.log('http server start at port ', CONFIG.httpserver.port);
	}
}
