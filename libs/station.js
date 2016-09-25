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
			sid:str.sid,
			T:str.Temperature,
			Humi:str.Humidity,
			U:str.Voltage,
			I:str.Current,
			charge_state: str.ChaState
		}
		conn.query('select * from tb_station_module where sn_key=?',str.sn_key, function(err, res){
			if(err){
				return console.log(err);
			}
			if(res&&res.length > 0){
				conn.query('insert into tb_station_module_history set ?', res, function(err, res2){
					if(err){
						return console.log(err);
					}
					conn.query('delete from tb_station_module where sn_key=?',str.sn_key, function(err, res3){
						if(err){
							return console.log(err);
						}
						conn.query('insert into tb_station_module set ?', data, function(err, results){
							if(err){
								return console.log('insert error', err);
							}
							console.log('insert done');
						})
					})
				})
			}else{
				conn.query('insert into tb_station_module set ?', data, function(err, results){
					if(err){
						return console.log('insert error', err);
					}
					console.log('insert done');
				})
			}
		})

	}
}