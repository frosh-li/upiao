const formatDate = require('../common/formatDate.js');
const sendParamHard = require('../common/sendParam.js')
/**
 * 读取mysql数据的通用服务
 */
class Service {
    addLog(sn_key, msg) {
        return new Promise((resolve, reject) => {
           conn.query(`insert into my_running_log(sid, content) values(${sn_key}, '${msg}')`, function(err){
                if(err){
                    console.log(err);
                    return;
                }
           });
        })
    }
    /**
    * 报警发送短信业务逻辑
    */
    sendMsg(item){
    	new Promise((resolve, reject)=>{
            Promise.all([
                this.getAlertSetting(),
                this.getAlertDesc(item),
            ]).then(res => {
                let needSendMsg = res[0];
                if(needSendMsg){
                    let alertDesc = res[1];
                    let msgContent = alertDesc['desc'];
                    if(alertDesc.send_msg == 0){
                        // 不需要发送短信
                        logger.info('报警不需要发送短信',msgContent);
                        return;
                    }
                    // 发送掉站短信
                    this.getSiteInfo(sn_key)
                        .then(result => {
                            if(result && result.length > 0){
                                msgContent += ",数值:"+item['current'];
                                msgContent += ",参考值:"+item['climit'];
                                msgContent += ",站点:"+result[0]['site_name']+",站号:"+result[0]['sid'];
                                msgContent += ",组号:"+item.sn_key.substr(10,2);
                                msgContent += ",电池号:"+item.sn_key.substr(12,2);
                                Utils.sendMsg(result, msgContent)
                            }else{
                                logger.info('获取站点信息失败', sn_key);
                            }
                        })
                        .catch((e) => {
                            logger.info('get data from site error', err);
                        });
                }
            })
            .catch(e => {
                logger.info(e);
            })
    	})
    }
    /**
     * getStationListWithoutParam - 获取没有参数的站点列表数据
     * 用于同步参数
     *
     * @return {type}  description
     */
    getStationListWithoutParam() {
        let sql = `
            select
            tb_station_module.sn_key,
            tb_station_module.CurSensor
            from tb_station_module
            where
            sn_key
            not in
            (select sn_key from tb_station_param)
        `;

        logger.info(sql);

        conn.query(sql, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            results.forEach((item)=>{
                sendParamHard('StationPar', {
                    sn_key:item.sn_key.toString(),
                    CurSensor: item.CurSensor
                });
            });
        });
    }


    /**
     * onConnectSite - 站点连接的时候删除系统报警中的掉站报警数据
     *
     * @param  {type} sn_key description
     * @return {type}        description
     */
    onConnectSite(sn_key) {
      let sql = `delete from systemalarm where station=${sn_key}`;
    	conn.query(sql, function(err, results){
    		if(err){
    			logger.info(`清理站点${sn_key}系统报警信息失败${err.message}`);
    		}else{
    			logger.info(`清理站点${sn_key}系统报警信息完成`);
    		}
    	})
    }


    /**
     * lostSite - 掉战信息写入
     *
     * @param  {type} sn_key  description
     * @param  {type} desc="" description
     * @param  {type} tips="" description
     * @return {type}         description
     */
    lostSite(sn_key, desc="", tips="") {
      let sql = `insert into systemalarm(station, \`desc\`, tips) values(${sn_key}, '${desc}', '${tips}')`;
    	conn.query(sql, function(err, results){
    		if(err){
    			logger.info(`更新掉站信息${sn_key}失败${err.message}`);
    		}else{
    			logger.info(`更新掉站信息成功${sn_key}`);
    		}
    	})
    }


    /**
     * clearRealdata - 删除实时表中的实时数据
     *
     * @param  {type} sn_key description
     * @return {type}        description
     */
    clearRealdata(sn_key) {
        conn.query(`delete from tb_station_module where sn_key=${sn_key}`, function(err, data){
    		if(err){
    			logger.info(`清理站实时表数据失败${sn_key}:${err.message}`);
    		}else{
    			logger.info(`清理站实时表数据完成${sn_key}`);
    		}
    	})

    	conn.query(`delete from tb_group_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
        if(err){
    			logger.info(`清理组实时表数据失败${sn_key}:${err.message}`);
    		}else{
    			logger.info(`清理组实时表数据完成${sn_key}`);
    		}
    	})

    	conn.query(`delete from tb_battery_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
        if(err){
    			logger.info(`清理电池实时表数据失败${sn_key}:${err.message}`);
    		}else{
    			logger.info(`清理电池实时表数据完成${sn_key}`);
    		}
    	})
    }


    /**
     * getSiteInfo - 获取站点管理人员相关信息，为了发送短信做准备
     *
     * @param  {type} sn_key description
     * @return {type}        description
     */
    getSiteInfo(sn_key) {
        let sql = `
            select
                site_name,
                sid,
                functionary_phone,
                functionary_sms,
                area_owner_phone,
                area_owner_sms,
                parent_owner_phone,
                parent_owner_sms
                from my_site
                where serial_number=${sn_key}
        `;
        return new Promise((resolve, reject) => {
                conn.query(sql, function(err, result){
                    if(err){
                        return reject(err);
                    }
                    return resolve(result);
                });

        })

    }

    /**
    * 定时清理站信息等
    */
    clearSites() {

    	logger.info('start clear site data');
    	let clearTimer = 1;
      let cautionClearTime = 5;
    	let now = new Date(new Date()-1000*60*clearTimer);
    	let nowString = formatDate(now);
    	let nowCaution = new Date(new Date()-1000*60*cautionClearTime);
    	let nowClearCautionString = formatDate(nowCaution);
    	let currentDate = new Date();
    	let currentDateStr = formatDate(currentDate);
    	let currentClearDate = new Date(currentDate - clearTimer*1000*60);
    	let currentClearDateStr = formatDate(currentClearDate);

      ['tb_station_module', 'tb_group_module', 'tb_battery_module']
        .forEach((table) => {
            let clearOldSql = `delete from ${table} where record_time < "${nowString}"`;
            logger.info("清理实时数据", clearOldSql);
            conn.query(clearOldSql);
        });
        // 清理过期报警信息
        conn.query(`delete from my_alerts where time < "${nowClearCautionString}"`);
    	// 清理系统报警
    	conn.query('delete from systemalarm where station not in (select serial_number from my_site)');

    }

    //判断系统是否开启了发送短信报警的配置

    getAlertSetting() {
        let sql = "select * from my_config where `key`='sms_on_off' and `value`='s:1:\"1\";'";
        return new Promise((resolve, reject)=>{
    		conn.query(sql, function(err, res){
    			if(err){
    				logger.info('check sms_on_off error', err);
    				return reject(err);
    			}
                if(res && res.length > 0){
                    return resolve(res[0]);
                }else{
                    return reject(new Error("找不到短信配置，默认不发送短信"));
                }
            });
        });
    }

    // 获取报警的配置信息
    getAlertDesc(item) {
        let sql = `
            select
            *
            from my_station_alert_desc
            where en='${item.code}'
            and
            my_station_alert_desc.type='${item.type}'
        `;
        return new Promise((resolve, reject) => {
            conn.query(sql , function(err, res){
                if(err){
                    return reject(err);
                }
                if(res && res.length > 0) {
                    return resolve(res[0]);
                }else{
                    return reject(new Error(`找不到报警配置信息${item.code}:${item.type}`));
                }
            });
        })
    }

    /**
    * 根据状态码判断是否已经存在对应警情
    * 4 自动处理
    * 2 已经忽略
    * 1 人工处理
    * 0 未处理
    */
    getAlertsByStatus(sn_key, code, status) {
        let sql = `
            select * from my_alerts where
            status = ${status} and
            sn_key = '${sn_key}' and
            code = '$code}'
        `;
        return new Promise((resolve, reject) => {
            conn.query(sql, function(err, ret){
                if(err){
                    return reject(err);
                }
                if(ret && ret.length > 0 ){
                    return resolve(ret[0]);
                }else{
                    return resolve(false);
                }
            })
        })
    }

    /*
    * 批量插入所有的报警信息到历史表和实时表
    */
    batchInsertCaution(sn_key, data, insertHistory) {
        let sqls = [];
        let sqls_history = [];

        data.forEach(item => {
          let sql = `insert into my_alerts(type, code, time, current, climit, sn_key) values("${item.type}","${item.code}","${formatData(item.time)}","${item.current}","${item.climit}", "${item.sn_key}")`;
          sqls.push(sql);
          let sql_history = `insert into my_alerts_history(type, code, time, current, climit, sn_key) values("${item.type}","${item.code}","${formatData(item.time)}","${item.current}","${item.climit}", "${item.sn_key}")`;
          sqls_history.push(sql_history)
          this.sendMsg(item);
        })

        return new Promise((resolve, reject) => {
            // 插入历史
            if(insertHistory){
                conn.query(sqls_history.join(";"),(err, results) => {
                  if(err){
                    logger.info('批量插入历史报警失败', err.message);
                  }else{
                    logger.info('批量插入历史报警成功');
                  }
                })

            }

            let sql = `
              delete from my_alerts where floor(sn_key/10000)=${sn_key};
            `;
            console.log(sql, '警情条数为', sqls.length);
            conn.query(sql + sqls.join(";"), function(err, results){
      				if(err){
      					logger.info('批量插入实时报警失败', err.message);
      				}else{
      					logger.info('批量插入实时报警成功'.green);
      				}
              return resolve("DONE");
            })

        })
    }

    clearRealCaution(sn_key) {
      return new Promise((resolve, reject) => {
        let sql = `
          delete from my_alerts where floor(sn_key/10000)="${sn_key}"
        `;
        logger.info('clearall', sql);
        conn.query(sql, function(err, ret){
            if(err){
                return reject(err);
            }
            return resolve(true);
        })
      })
    }

    //定时任务：更新维护日期
    updateMaintain(){
        let sql = `SELECT b . * , s.site_name, s.sid FROM my_ups_info AS b LEFT JOIN my_site AS s ON b.sid = s.serial_number order by b.sid asc`;
        conn.query(sql, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) month = "0" + month;
            if (day < 10) day = "0" + day;
            var nowDate = year + "-" + month + "-" + day;
            results.forEach((item)=>{
                // console.log(item.ups_maintain_date , date.toLocaleDateString().replace(/\//ig,'-'));
                if (item.ups_period_days > 0 && item.ups_maintain_date == nowDate){
                    let ups_day = item.ups_period_days;
                    let ups_id = item.id;
                    sql = `update my_ups_info set ups_maintain_date = DATE_FORMAT(date_add(now(), interval ${ups_day} day),'%Y-%m-%d') where id = ${ups_id} `;
                    console.log(sql);
                    conn.query(sql);
                }
            });
        });
    } 
}
const service = new Service();
module.exports = service;
