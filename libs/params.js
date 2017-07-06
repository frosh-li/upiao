
/**
 * 更新所有参数
 * step 1
 * 更新params 表
 * step 2
 * 更新 site表
 * 
 * @param  {[type]} datas [description]
 * @return {[type]}       [description]
 */
function update(datas){
	let sn_key = datas.StationPar.sn_key;
	updateParams(sn_key,"station", "StationPar");
	updateParams(sn_key,"group", "GroupPar");
	updateParams(sn_key,"battery", "BatteryPar");
}

function updateParams(sn_key, table, Params){
	new Promise((resolve, reject)=>{
		conn.query(`select * from tb_${table}_param where sn_key=${sn_key} limit 1`, (err, results, fields)=>{
			if(err){
				return reject(err);
			}
			if(results.length == 0){
				// update
				return resolve(fields,0);
			}else{
				// insert
				return resolve(fields,1);
			}
		})
	}).then((fields, ctype)=>{
		if(ctype == 0){
			return new Promise((resolve, reject)=>{
				var updateObj = {};
				updateObj.sn_key = sn_key;
				fields.forEach(function(item){
					if(item == "sn_key"){
						return;
					}
					updateObj[item] = datas[Params][item];
				});
				conn.query(`update tb_${table}_param set ? where sn_key=${sn_key}`, updateObj, (err, results)=>{
					if(err){
						console.log(err);
					}
					return resolve(1);
				});
			})
		}else{
			return new Promise((resolve, reject)=>{
				var updateObj = {};
				updateObj.sn_key = sn_key;
				fields.forEach(function(item){
					if(item == "sn_key"){
						return;
					}
					updateObj[item] = datas[Params][item];
				});
				conn.query(`insert into tb_${table}_param set ?`, updateObj, (err, results)=>{
					if(err){
						console.log(err);
					}
					return resolve(1);
				});
			})
		}
	});
}

module.exports = {
	update:update
}