const Service = require('../services/service.js');
const Utils = require('./utils.js');

function disConnectSite(sn_key){
	if(!sn_key){
		return;
	}
	let desc = "站点连接断开";
	let tips = "检查站点或本地网络状况，电源及通信线路或联系BMS厂家";
    Service.lostSite(sn_key, desc, tips);
    Service.addLog(`${sn_key}断开连接`);
	// 发送掉站短信
    Service.getSiteInfo(sn_key)
        .then(result => {
            if(result && result.length > 0){

                let msgContent = desc;
                msgContent += ",站点:"+result[0]['site_name']+",站号:"+result[0]['sid'];

                Utils.sendMsg(result, msgContent)
            }else{
                logger.info('获取站点信息失败', sn_key);
            }
        })
        .catch((e) => {
            logger.info('get data from site error', err);
        })

	// 去掉站点消息
    Service.clearRealdata(sn_key);
}

module.exports = {
	disConnectSite:disConnectSite,
	onConnectSite:(sn_key) => {
        Service.onConnectSite(sn_key)
    },
}
