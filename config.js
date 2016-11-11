/**
 * 配置文件
 * 数据库配置
 */

module.exports = {
	db:{
		host:"127.0.0.1",
		user:"root",
		password:"",
		database: "db_bms_english4",
		multipleStatements:true,
		dateStrings:true
	},
	tcpserver:{
		port:60026,
		exclusive:true
	},
	httpserver:{
		port:3000
	}
};
