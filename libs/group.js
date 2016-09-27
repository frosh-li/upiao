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
				// Humi:str.Humidity,
				GroupU:item.Voltage,
				I:item.Current,
				T:item.Temperature
				// charge_state: item.ChaState
			})
		});

		conn.query(`select * from tb_group_module where sn_key in (${sn_keys.join(",")})`,function(err, res){
			if(err){
				return console.log(err);
			}

			if(res&&res.length > 0){
				insertBulkHistory(res, function(){
					conn.query(`delete from tb_group_module where sn_key in (${sn_keys.join(",")})`,function(err, res3){
						if(err){
							return console.log(err);
						}

						insertBulk(data);
					})
				})

			}else{
				insertBulk(data);

			}
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
				console.log('insert group history error', err);
			}else{
				console.log('insert group history done');
			}
			cb();
		})
}

function insertBulk(data, table){
    var sql = buildMultiSql(data);
    var isql = `insert into tb_group_module(${sql.values}) values ${sql.vals}`;
    console.log(isql.green);
		conn.query(isql, function(err, results){
			if(err){
				console.log('insert group error', err);
			}else{
				console.log('insert group done');
			}
			//insertBulkHistory(data, cb);
		})
}
