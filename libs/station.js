// { sn_key: '11606123460000',
//   CurSensor: '101',
//   sid: 12346,
//   Groups: 2,
//   GroBats: 6,
//   Current: 45,
//   Voltage: 83.7,
//   Temperature: 37,
//   Humidity: 86,
//   ChaState: 2 }
module.exports = {
	deal: function(str,record_time){
		var data = {
			record_time:record_time,
			sn_key:str.sn_key,
			GroBats:str.GroBats,
			Groups:str.Groups,
			sid:str.sid,
			Temperature:str.Temperature,
			TemCol:str.TemCol,
			Humidity:str.Humidity,
			HumCol:str.HumCol,
			Voltage:str.Voltage,
			VolCol:str.VolCol,
			Current:str.Current,
			CurCol:str.CurCol,
			ChaState: str.ChaState,
			Capacity:str.Capacity,
			Lifetime:str.Lifetime,
			CurSensor:str.CurSensor
		}
		watchSite.onConnectSite(str.sn_key);
		conn.query('select * from tb_station_module where sn_key=?',str.sn_key, function(err, res){
			if(err){
				return logger.info(err);
			}
            /*
			if(res&&res.length > 0){
				conn.query('insert into tb_station_module_history set ?', res, function(err, res2){
					if(err){
						return logger.info(err);
					}
					conn.query('delete from tb_station_module', function(err, res3){
						if(err){
							return logger.info(err);
						}
						conn.query('insert into tb_station_module set ?', data, function(err, results){
							if(err){
								return logger.info('insert error', err);
							}
							logger.info('insert done', data.sn_key);
						})
					})
				})
			}else{
            */
				conn.query('insert into tb_station_module_history set ?', data, function(err, results){
					if(err){
						return logger.info('insert station error', err);
					}
					//logger.info('insert station done', data.sn_key);
				})
			//}
		})

	}
}
