const sqlConn = require('../sqlConnect/');
const ejsExcel = require('ejsexcel');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
process.env.TZ = "Asia/Shanghai";
(async()=>{
	// 只要运行，就开始跑上周的数据，按周进行统计
	//
	let startOfWeek = moment().startOf('year');
	let tableType = "year";
	let lastWeek = moment(startOfWeek).subtract(1, 'years');
	console.log('start of week', startOfWeek, lastWeek);
	const {models: {my_ignores, my_site, my_station_alert_desc, my_report_log}} = await sqlConn.connect();
	console.log(my_ignores, my_site, my_station_alert_desc, my_report_log);
	my_ignores.belongsTo(my_site, {foreignKey: "sn_key", targetKey:"serial_number"});
	my_ignores.belongsTo(my_station_alert_desc, {foreignKey: "code", targetKey:"en"});
	let ignores = await my_ignores.findAll({
		where: {
			updateTime: {
				$gte: lastWeek.format("YYYY-MM-DD HH:mm:ss"),
				$lt: startOfWeek.format("YYYY-MM-DD HH:mm:ss"),
			}
		},
		include: [
			{
				model: my_site,
				attributes: ['site_name', 'sid']
			},
			{
				model: my_station_alert_desc,
				attributes: ['desc']
			}
		]
	});
	const exlBuf = fs.readFileSync(path.resolve(__dirname, "../reports_tpl/",'report_ignore_tpl.xlsx'));
	console.log('read template');
	let data = [];
	data = JSON.parse(JSON.stringify(ignores));
	data.map((item, index) => {
		data[index].updateTime = moment(item.updateTime).utcOffset(-8).format("YYYY/MM/DD HH:mm:ss");
	})
	console.log('----------')
	console.dir(data);
	const exlBuf2 = await ejsExcel.renderExcel(exlBuf, data);
	console.log('render buffer');
	let filepath = `report-${tableType}-ignore-${moment(lastWeek).year()}.xlsx`;
	fs.writeFileSync(path.resolve(__dirname, "../../qingda/reports/", filepath), exlBuf2);
	console.log('excel生成完成');
	//开始写入数据库
	await my_report_log.findOrCreate({
		where:{
			report_path: filepath
		}, 
		defaults: {
			report_type: tableType,
			report_table:"my_ignores",
			report_index: `${moment(lastWeek).year()}年`,
			report_path: filepath,
		}
	});
	process.exit();
})()
