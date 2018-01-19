const http = require('http');
const CONFIG = require('./config.js');
const url = require("url");
const querystring = require("querystring");
var sendParamHard = require("./common/sendParam.js");
var sendmsgFunc = require('./sendmsg/');
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
	},

	{
		method:"POST",
		path:"/sendmsg",
		func:sendAllMsg
	},
    {
        method:"POST",
        path:"/cmd",
        func:sendCmd
    }
];
const server = http.createServer((req, res) => {
	res.json = function(str){
		res.end(JSON.stringify(str));
	}
	res.setHeader('Content-Type', 'application/json');
	res.setHeader("Access-Control-Allow-Origin","*");

	logger.info(req.method);
	logger.info(req.url);
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
		logger.info('git update',err, stdout, stderr);
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

function sendCmd(req, res){
	if(req.method.toUpperCase() !== "POST"){
		return res.json({status:400, msg:"method need to be post"});
	}
    var datas = req.body.cmd;
    try{
        JSON.parse(datas.replace("<","").replace(">",""));
        res.json({status: 200, msg:'send success'});
    }catch(e){
        res.json({status: 400, msg:'JSON error'});
    }
}

function sendAllMsg(req, res){
	if(req.method.toUpperCase() !== "POST"){
		return res.json({status:400, msg:"method need to be post"});
	}
	new Promise((resolve, reject)=>{
		let sql = `select 
					my_site.site_name,
					my_site.sid,
					my_site.functionary_phone,
					my_site.functionary_sms,
					my_site.area_owner_phone,
					my_site.area_owner_sms,
					my_site.parent_owner_phone,
					my_site.parent_owner_sms,
					my_alerts.*,my_station_alert_desc.* from my_alerts,my_station_alert_desc,my_site 
					where my_alerts.status=0 and my_station_alert_desc.en=my_alerts.code 
					and my_site.serial_number=floor(my_alerts.sn_key/10000)*10000
					`;
		conn.query(sql, function(err, results){
			if(err){
				return reject(err);
			}
			if(!results || results.length == 0){
				return reject(new Error('无需发送短信'));
			}
			return resolve(results);
		})
	}).then((data)=>{
		data.forEach((item)=>{
			let msgContent = item['desc'];
			msgContent += ",数值:"+item['current'];
			msgContent += ",参考值:"+item['climit'];
			msgContent += ",站点:"+item['site_name']+",站号:"+item['sid'];
			msgContent += ",组号:"+item.sn_key.substr(10,2);
			msgContent += ",电池号:"+item.sn_key.substr(12,2);
			
			var mobiles = [];
			if(!item['functionary_sms'] && !item['area_owner_sms'] && !item['parent_owner_sms']){
				// 不需要发送短信
				logger.info("站点设置成不发送短信",msgContent);
				return;
			}
			if(/^[0-9]{11}$/.test(item['functionary_phone'])){
				mobiles.push(item['functionary_phone']);	
			}else{
				logger.info('手机格式错误', mobile);
			}

			if(/^[0-9]{11}$/.test(item['area_owner_phone'])){
				mobiles.push(item['area_owner_phone']);	
			}else{
				logger.info('手机格式错误', item['area_owner_phone']);
			}

			if(/^[0-9]{11}$/.test(item['parent_owner_phone'])){
				mobiles.push(item['parent_owner_phone']);	
			}else{
				logger.info('手机格式错误', item['parent_owner_phone']);
			}

			if(mobiles.length > 0){
				logger.info('发送短信', mobiles, msgContent);
				sendmsgFunc(mobiles.join(","),msgContent);
			}else{
				logger.info('所有手机格式都错误');	
			}
		})
	})
}


function stepCol(batterys,sn_key){
	var bat = batterys.shift();
	if(!bat){
		logger.info('所以采集完成',sn_key);
		return;
	}
	var towrite = `<{"FuncSel":{"Operator": 130, "00":${parseInt(bat.substring(10,12))},"01":${parseInt(bat.substring(12,14))},"02":21,"03":0}}>`;
		// 00 第一组
		// 01 组内编号
		// 02 操作码 21
		// 03 0

		logger.info(towrite.toString())
		sockets[sn_key].write(towrite.toString());	
		setTimeout(function(){
			stepCol(batterys, sn_key);	
		}, 2500);
		
}

// <{"WhatTime": {  "sn_key":"11611061050000",  "sid": 9 }}>  请求时间
function ircollect(req, res){
	logger.info('start to 内阻采集');
	logger.info(req.body.batterys);
  	var batterys = req.body.batterys.split(",");
	var sn_key = batterys[0].substring(0,10)+"0000";
		logger.info('开始请求内阻采集',sn_key);
	logger.info(sockets[sn_key]);
	if(sockets[sn_key]){
		logger.info('开始请求内阻采集',sn_key);
		logger.info('batterys', batterys);

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
		logger.info('http server start at port ', CONFIG.httpserver.port);
	}
}
