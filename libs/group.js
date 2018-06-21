// [ { sn_key: '11606123460100',
//     gid: 1,
//     CurSensor: 0,
//     GroBats: 6,
//     Current: 22,
//     Voltage: 83.7,
//     Temperature: 32.6,
//     CurState: 2 },
//   { sn_key: '11606123460200',
//     gid: 2,
//     CurSensor: 1,
//     GroBats: 6,
//     Current: 23,
//     Voltage: 83.7,
//     Temperature: 32.6,
//     CurState: 2 } ]
module.exports = {
	deal: function(str,record_time,sid){
		var sn_keys = (function(str){
			var ret = [];
			str.forEach(function(item){
				ret.push(item.sn_key)
			})
			return ret;
		})(str);


		var data = [];
		str.forEach(function(item){
			data.push({
				record_time:formatData(record_time),
				sn_key:item.sn_key,
				gid:item.gid,
				sid:sid,
				GroBats:item.GroBats||0,
				Humidity:item.Humidity || 0,
				HumCol:item.HumCol || 0,
				Voltage:item.Voltage || 0,
				VolCol:item.VolCol || 0,
				Current:item.Current || 0,
				CurCol:item.CurCol || 0,
				Temperature:item.Temperature|| 0,
				TemCol:item.TemCol || 0,
				ChaState: item.ChaState || 0,
				Avg_U:item.Avg_U || 0,
				Avg_T:item.Avg_T || 0,
				Avg_R:item.Avg_R || 0,
			})
		});

		conn.query(`delete from tb_group_module where floor(sn_key/10000)*10000 = ${Math.floor(sn_keys[0]/10000)*10000}`,function(err, res){
			if(err){
				return logger.info(err);
			}
		  insertBulk(data);
		})

	}
}

function buildMultiSql(data){

    var bsql = [];
    var ret = [];
    data.forEach(function(item){
        var tmp = [];
        bsql = [];
        for(var key in item){
            if(item.hasOwnProperty(key)){
            bsql.push(key);
            tmp.push("'"+item[key]+"'");
            }
        }
        ret.push("("+tmp.join(",")+")");
    });
    return {
        values: bsql.join(","),
        vals: ret.join(",")
    };
}

function insertBulkHistory(data,cb){
    var sql = buildMultiSql(data);
    var isql = `insert into tb_group_module_history(${sql.values}) values ${sql.vals} `;
		conn.query(isql, function(err, results){
			if(err){
				logger.info('insert group history error', err);
			}else{
				//logger.info('insert group history done');
			}
			cb();
		})
}

function insertBulk(data, table){
    var sql = buildMultiSql(data);
    var isql = `insert into tb_group_module_history(${sql.values}) values ${sql.vals}`;
		var isqlreal = `insert into tb_group_module(${sql.values}) values ${sql.vals}`;
		conn.query(isql, function(err, results){
			if(err){
				logger.info('insert group history error', err, isql);
			}
		})

		conn.query(isqlreal, function(err, results){
			if(err){
				logger.info('insert group history realtime error', err, isql);
			}
		})

}
