
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
				Humidity:item.Humidity || 0,
				HumCol:item.HumCol || 0,
				DrvCurrent:item.DrvCurrent || 0,
				DrvCol:item.DrvCol || 0,
				Voltage:item.Voltage || 0,
				VolCol:item.VolCol || 0,
				Resistor:item.Resistor || 0,
				ResCol:item.ResCol || 0,
				Temperature:item.Temperature || 0,
				TemCol:item.TemCol || 0,
				Capacity:item.Capacity || 0,
				Lifetime:item.Lifetime || 0,
				Dev_R:item.Dev_R || 0,
				Dev_U:item.Dev_U || 0,
				Dev_T:item.Dev_T || 0,
				DevRCol:item.DevRCol || 0,
				DevUCol:item.DevUCol || 0,
				DevTCol:item.DevTCol || 0,
			})
		});
		conn.query(`delete from tb_battery_module where floor(sn_key/10000)*10000 = ${Math.floor(sn_keys[0]/10000)*10000}`,function(err, res){
			if(err){
				return logger.info(err);
			}
      insertBulk(data);
		});

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


function insertBulk(data, table){
    var sql = buildMultiSql(data);
    var isql = `insert into tb_battery_module_history(${sql.values}) values ${sql.vals}`;
		var isqlreal = `insert into tb_battery_module(${sql.values}) values ${sql.vals}`;
		conn.query(isql, function(err, results){
			if(err){
				logger.info('insert battery history error', err);
			}
		});

		conn.query(isqlreal, function(err, results){
			if(err){
				logger.info('insert battery realtime error', err);
			}
		});

}
