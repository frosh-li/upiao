const formatDate = require('../common/formatDate.js');
/**
 * 读取mysql数据的通用服务
 */
class Service {
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
    			logger.info('update system alarm fail', err);
    		}else{
    			logger.info('update system alarm done');
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
    			logger.info('update system alarm fail', err);
    		}else{
    			logger.info('update system alarm done');
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
    			logger.info('remote from tb_station_module err', err);
    		}else{
    			logger.info('remote from tb_station_module done');
    		}
    	})

    	conn.query(`delete from tb_group_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
    		if(err){
    			logger.info('remote from tb_group_module err', err);
    		}else{
    			logger.info('remote from tb_group_module done');
    		}
    	})

    	conn.query(`delete from tb_battery_module where floor(sn_key/10000) = ${sn_key/10000}`, function(err, data){
    		if(err){
    			logger.info('remote from tb_battery_module err', err);
    		}else{
    			logger.info('remote from tb_battery_module done');
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
    	let now = new Date(new Date()-1000*60*clearTimer);
    	let nowString = formatDate(now);
    	let nowCaution = new Date(new Date()-1000*60*clearTimer);
    	let nowClearCautionString = formatDate(nowCaution);
    	let currentDate = new Date();
    	let currentDateStr = formatDate(currentDate);
    	let currentClearDate = new Date(currentDate - clearTimer*1000*60);
    	let currentClearDateStr = formatDate(currentClearDate);

        ['tb_station_module', 'tb_group_module', 'tb_battery_module']
            .forEach((table) => {
                let clearOldSql = `delete from ${table} where record_time < "${nowString}"`;
                logger.info("clear oldCaution", clearOldSql);
                conn.query(clearOldSql);
            });
    	let clearSql = `update
                      my_alerts
                      set
                      status=4,
                      markup="系统自动处理",
                      markuptime="${currentDateStr}"
                      where
                      time<"${currentClearDateStr}"
                      and
                      status=0`;
        logger.info('clear nowCaution', clearSql);
    	conn.query(clearSql);

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
    * 插入或者更新Error信息
    */
    InsertOrUpdateError(ctypeItem, item) {
        let obj = [
            item.current,
            new Date(),
            item.climit,
            item.sn_key,
            item.code
        ];
        let sql;
        // 存在状态为0的修改时间
        // 不存在状态为0的直接插入
        if(ctypeItem !== false){
            sql = `update my_alerts
                set
                current=?,
                time=?,
                climit=?
                where id=${ctypeItem.id}
            `;
        }else{
            sql = "insert into my_alerts set ?";
            sendMsg(item);
        }
        return new Promise((resolve, reject) => {
            conn.query(sql, ctypeItem === false ? item : obj, function(err, results){
				if(err){
					logger.info('insert error error', err);
				}else{
					logger.info('insert error done'.green);
				}
                return resolve("DONE");
			})
        })
    }
}
const service = new Service();
module.exports = service;