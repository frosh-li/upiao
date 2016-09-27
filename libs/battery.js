// { sn_key: '11606123450206',
//     gid: 2,
//     bid: 6,
//     Voltage: 13.95,
//     Temperature: 32.6,
//     Resistor: 13,
//     DrvCurrent: 1.672,
//     Eff_N: 300,
//     Capacity: 90 }



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
				bid:item.bid,
				gid:item.gid,
				mid:item.bid,
				sid:sid,
				// Humi:str.Humidity,
				PredictCapacity:item.DrvCurrent,
				U:item.Voltage,
				R:item.Resistor,
				T:item.Temperature
				// charge_state: item.ChaState
			})
		});
		conn.query(`select * from tb_battery_module where sn_key in (${sn_keys.join(",")})`,function(err, res){
			if(err){
				return console.log(err);
			}
			if(res&&res.length > 0){
				insertBulkHistory(res, function(){
					conn.query(`delete from tb_battery_module where sn_key in (${sn_keys.join(",")})`,function(err, res3){
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
		conn.query(`insert into tb_battery_module_history(${sql.values}) values ${sql.vals}`, function(err, results){
			if(err){
				console.log('insert battery history error', err);
			}else{
				console.log('insert battery history done');
			}
            cb();
			//insertBulkHistory(data, cb);
		})
}

function insertBulk(data, table){
    var sql = buildMultiSql(data);
    var isql = `insert into tb_battery_module(${sql.values}) values ${sql.vals}`;
		conn.query(isql, function(err, results){
			if(err){
				console.log('insert battery error', err);
			}else{
				console.log('insert battery done');
			}
			//insertBulkHistory(data, cb);
		})
        /*
	var item = data.shift();
	if(item){
		conn.query('insert into tb_battery_module set ?', item, function(err, results){
			if(err){
				console.log('insert battery error', err);
			}else{
				console.log('insert battery done');
			}
			insertBulk(data);
		})
	}
    */
}
