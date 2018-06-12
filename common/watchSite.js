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
	conn.query(`select site_name,sid,functionary_phone,functionary_sms,area_owner_phone,area_owner_sms,parent_owner_phone,parent_owner_sms from my_site where serial_number=${sn_key.substring(0,10)+"0000"}`, function(err, result){
		if(err){
			logger.info('get data from site error', err);
			return;
		}
		if(result && result.length > 0){
			var mobile = result[0]['functionary_phone'];
			var ifsendmsg = result[0]['functionary_sms'];
			if(!ifsendmsg && !result[0]['area_owner_sms'] && !result[0]['parent_owner_sms']){
				// 不需要发送短信
				return;
			}
			let msgContent = desc;
			msgContent += ",站点:"+result[0]['site_name']+",站号:"+result[0]['sid'];

			var mobiles = [];
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
	})

	// 去掉站点消息

	conn.query(`delete from tb_station_module where sn_key=${sn_key}`, function(err, data){
		if(err){
			logger.info('remote from tb_station_module err', err);
		}else{
			logger.info('remote from tb_station_module done');
		}
	})

	conn.query(`delete from tb_group_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
		if(err){
			logger.info('remote from tb_group_module err', err);
		}else{
			logger.info('remote from tb_group_module done');
		}
	})

	conn.query(`delete from tb_battery_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
		if(err){
			logger.info('remote from tb_battery_module err', err);
		}else{
			logger.info('remote from tb_battery_module done');
		}
	})
}

function clearSites(){
	// logger.info('start clear site data');
	let clearTimer = 1;
	var now = new Date(new Date()-1000*60*clearTimer);
	var nowString = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDate())+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
	var nowCaution = new Date(new Date()-1000*60*clearTimer);
	var nowClearCautionString = nowCaution.getFullYear()+"-"+(nowCaution.getMonth()+1)+"-"+(nowCaution.getDate())+" "+nowCaution.getHours()+":"+nowCaution.getMinutes()+":"+nowCaution.getSeconds();
	var currentDate = new Date();
	var currentDateStr = currentDate.getFullYear()+"-"+(currentDate.getMonth()+1)+"-"+(currentDate.getDate())+" "+currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds();
	var currentClearDate = new Date(currentDate - clearTimer*1000*60);
	var currentClearDateStr = currentClearDate.getFullYear()+"-"+(currentClearDate.getMonth()+1)+"-"+(currentClearDate.getDate())+" "+currentClearDate.getHours()+":"+currentClearDate.getMinutes()+":"+currentClearDate.getSeconds();
	conn.query('delete from tb_station_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_group_module where record_time'+"<'"+nowString+"'");
	conn.query('delete from tb_battery_module where record_time'+"<'"+nowString+"'");
	var clearSql = `update
                  my_alerts
                  set
                  status=4,
                  markup="系统自动处理",
                  markuptime="${currentDateStr}"
                  where
                  time<"${currentClearDateStr}"
                  and
                  status=0`;
  logger.info('clear nowCaution', clearSql);
	conn.query(clearSql);

	// 清理系统报警
	conn.query('delete from systemalarm where station not in (select serial_number from my_site)');
}

module.exports = {
	disConnectSite:disConnectSite,
	onConnectSite:(sn_key) => {
        Service.onConnectSite(sn_key)
    },
}
