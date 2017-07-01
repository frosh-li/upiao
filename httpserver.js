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
	res.json({status:200,msg:"set param done", query: req.query,body:req.body});
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
