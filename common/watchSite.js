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