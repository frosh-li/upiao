const sqlConn = require('./index.js');
const ejsExcel = require('ejsexcel');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
(async()=>{
	const {models: {my_ignores, my_site, my_station_alert_desc}} = await sqlConn.connect();
	console.log(my_ignores, my_site, my_station_alert_desc);
	my_ignores.belongsTo(my_site, {foreignKey: "sn_key", targetKey:"serial_number"});
	my_ignores.belongsTo(my_station_alert_desc, {foreignKey: "code", targetKey:"en"});
	let ignores = await my_ignores.findAll({
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
	console.log('----------')
	console.dir(data);
	const exlBuf2 = await ejsExcel.renderExcel(exlBuf, data);
	console.log('render buffer');
	fs.writeFileSync(path.resolve(__dirname, "../../qingda/", "./report-ignore-out.xlsx"), exlBuf2);
	console.log('excel生成完成')
	//console.log(ignores);
})()
