
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
	let sn_key = +datas.StationPar.sn_key;
	updateParams(sn_key,"station", "StationPar",datas);
	updateParams(sn_key,"group", "GroupPar",datas);
	updateParams(sn_key,"battery", "BatteryPar",datas);
}

function updateParams(sn_key, table, Params, datas){
	logger.info('开始更新参数',sn_key, table,Params);
	new Promise((resolve, reject)=>{
		let sql = `select * from tb_${table}_param where sn_key=${sn_key} limit 1`;
		logger.info(sql);
		conn.query(`select * from tb_${table}_param where sn_key=${sn_key} limit 1`, (err, results, fields)=>{
			if(err){
				return reject(err);
			}
			if(results.length == 0){
				// insert
				return resolve({fields:fields,ctype:0});
				
			}else{
				// update
				return resolve({fields:fields,ctype:1});
			}
		})
	}).then((_)=>{
		var fields = _.fields,
				ctype  = _.ctype;
		if(ctype == 1){
			return new Promise((resolve, reject)=>{
				var updateObj = [];
				// updateObj.sn_key = +sn_key;
				let updateStr = [];
				fields.forEach(function(item){
					if(item.name == "sn_key"){
						return;
					}
					updateStr.push(item.name+"=?");
					updateObj.push(datas[Params][item.name]);
				});
				let sql = `update tb_${table}_param set ${updateStr.join(",")} where sn_key=${sn_key}`;
				logger.info(sql);
				logger.info(updateObj);
				conn.query(sql, updateObj, (err, results)=>{
					if(err){
						logger.info(err);
					}else{
						logger.info(`update params for ${table} ${sn_key} success`);
					}
					return resolve(1);
				});
			})
		}else{
			return new Promise((resolve, reject)=>{
				var updateObj = {};
				updateObj.sn_key = +sn_key;
				fields.forEach(function(item){
					if(item.name == "sn_key"){
						return;
					}
					updateObj[item.name] = datas[Params][item.name];
				});
				let sql = `insert into tb_${table}_param set ?`;
				logger.info(sql);
				logger.info(updateObj);
				conn.query(`insert into tb_${table}_param set ?`, updateObj, (err, results)=>{
					if(err){
						logger.info(err);
					}else{
						logger.info(`insert params for ${table} ${sn_key} success`);
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