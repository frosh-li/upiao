function onConnectSite(sn_key){
    var sql = `delete from systemAlarm where station=${sn_key}`;
	conn.query(sql, function(err, results){
		if(err){
			console.log('update system alarm done', err);
		}else{
			console.log('update system alarm fail');
		}

		//insertBulkHistory(data, cb);
	})
}


function disConnectSite(sn_key){
	var desc = "站点连接断开";
    var sql = `insert into systemAlarm(station, \`desc\`) values(${sn_key}, '${desc}')`;
    console.log(sql);
	conn.query(sql, function(err, results){
		if(err){
			console.log('update system alarm done', err);
		}else{
			console.log('update system alarm fail');
		}
	})
}


module.exports = {
	disConnectSite:disConnectSite,
	onConnectSite:onConnectSite
}