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
}
const service = new Service();
module.exports = service;
