var sendmsgFunc = require('../sendmsg/');

function onConnectSite(sn_key){
    var sql = `delete from systemalarm where station=${sn_key}`;
	conn.query(sql, function(err, results){
		if(err){
			logger.info('update system alarm fail', err);
		}else{
			logger.info('update system alarm done');
		}

		//insertBulkHistory(data, cb);
	})
}


function disConnectSite(sn_key){
	if(!sn_key){
		return;
	}
	var desc = "站点连接断开";
	var tips = "检查站点或本地网络状况，电源及通信线路或联系BMS厂家";
    var sql = `insert into systemalarm(station, \`desc\`, tips) values(${sn_key}, '${desc}', '${tips}')`;
    logger.info(sql);
	conn.query(sql, function(err, results){
		if(err){
			logger.info('update system alarm fail', err);
		}else{
			logger.info('update system alarm done');
		}
	})


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


module.exports = {
	disConnectSite:disConnectSite,
	onConnectSite:onConnectSite
}
