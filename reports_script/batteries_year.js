/**
 * 电池信息报表生成脚本
 */
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
	const {models: {my_battery_info, my_site,tb_station_module_history,  my_report_log}} = await sqlConn.connect();
	my_battery_info.belongsTo(my_site, {foreignKey: "sid", targetKey:"serial_number"});
	//my_battery_info.belongsToMany(tb_station_module_history, {through:"BatteryAddInfo", foreignKey: "sid", targetKey:"sn_key"});
	//tb_station_module_history.belongsTo(my_battery_info, {foreignKey: "sn_key", targetKey:"sid"});
	let battery_info = await my_battery_info.findAll({
		attributes: ['id', 'sid', 'battery_factory', 'battery_num', 'battery_date', 'battery_life', 'battery_scrap_date'],
		include: [
			{
				model: my_site,
				attributes: ['site_name']
			},
			/*
			{
				model: tb_station_module_history,
				attributes: ['Capacity', 'LifeTime'],
				order: [ ['record_time', 'desc']],
			}
			*/
		]
	});
	const exlBuf = fs.readFileSync(path.resolve(__dirname, "../reports_tpl/",'report_battery_tpl.xlsx'));
	console.log('read template');
	let data = [];
	data = JSON.parse(JSON.stringify(battery_info));
	console.log(JSON.stringify(battery_info, null, 4));
	for(let index = 0 , len = data.length; index < len ; index++){
	//data.forEach(async (item, index) => {
		let item = data[index];
		data[index].site_name = item.my_site.site_name;
		delete data[index].my_site;
		data[index].battery_date = moment(item.battery_date).utcOffset(-8).format("YYYY/MM/DD");
		data[index].battery_scrap_date = moment(item.battery_scrap_date).utcOffset(-8).format("YYYY/MM/DD");
		let station_history = await tb_station_module_history.findOne({
			where: {
				sn_key: item.sid,
			},
			attributes: ['Capacity', "LifeTime"],
			order: [['record_time', 'desc']]
		});
		let json_station_history = (JSON.parse(JSON.stringify(station_history)));
		if(!station_history) {
			data[index].Capacity = "";
			data[index].LifeTime = "";
		}else{
			data[index].Capacity = json_station_history.Capacity;
			data[index].LifeTime = json_station_history.LifeTime;
		}

		data[index].sid = +item.sid.toString().substring(7,10);
	}
	console.log('----------')
	console.dir(data);
	const exlBuf2 = await ejsExcel.renderExcel(exlBuf, data);
	console.log('render buffer');
	let filepath = `report-${tableType}-battery-${moment(lastWeek).year()}.xlsx`;
	fs.writeFileSync(path.resolve(__dirname, "../../qingda/reports/", filepath), exlBuf2);
	console.log('excel生成完成');
	//开始写入数据库
	await my_report_log.findOrCreate({
		where:{
			report_path: filepath
		}, 
		defaults: {
			report_type: tableType,
			report_table:"my_battery_info",
			report_index: `${moment(lastWeek).year()}年`,
			report_path: filepath,
		}
	});
	process.exit();
})()
