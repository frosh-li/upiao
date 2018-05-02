const sendParamHard = require("./sendParam.js");
const Service = require("../services/service.js");
const sendmsgFunc = require('../sendmsg/');

/**
 * showConnections - 显示当前tcp服务器的连接数
 *
 * @param  {type} server description
 * @return {type}        description
 */
function showConnections(server){
	server.getConnections(function(err, num){
		if(!err){
			logger.info('current connections is', num.toString());
		}else{
			logger.info(err);
		}
	});
}

/**
 * 每隔30秒检查一次是否需要同步参数
 * 同步参数条件为
 * 在tb_station_module表中有数据
 * 但是在tb_station_param表中无数据
 */
function syncParams(){
    Service.getStationListWithoutParam();
}

function disConnectSocket(socket, ctype, err) {
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
    logger.log(`socket ${ctype}`,socket.sn_key, err);
    socket && socket.end();
}

function sendMsg(result, msgContent) {
	let mobile = result[0]['functionary_phone'];
	let ifsendmsg = result[0]['functionary_sms'];
	if(!ifsendmsg && !result[0]['area_owner_sms'] && !result[0]['parent_owner_sms']){
		// 不需要发送短信
		return;
	}
	let mobiles = [];
	if(/^[0-9]{11}$/.test(mobile)){
		mobiles.push(mobile);
	}else{
		logger.info('手机格式错误', mobile);
	}

	if(/^[0-9]{11}$/.test(result[0]['area_owner_phone'])){
		mobiles.push(result[0]['area_owner_phone']);
	}else{
		logger.info('手机格式错误', result[0]['area_owner_phone']);
	}

	if(/^[0-9]{11}$/.test(result[0]['parent_owner_phone'])){
		mobiles.push(result[0]['parent_owner_phone']);
	}else{
		logger.info('手机格式错误', result[0]['parent_owner_phone']);
	}

	if(mobiles.length > 0){
		logger.info('发送短信', mobiles, msgContent);
		sendmsgFunc(mobiles.join(","),msgContent);
	}else{
		logger.info('所有手机格式都错误');
	}
}

module.exports = {
    showConnections: showConnections,
    syncParams: syncParams,
	sendMsg: sendMsg,
	disConnectSocket: disConnectSocket
}
