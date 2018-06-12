const mysql = require('mysql');

const conn = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "db_bms_english4"
})

conn.connect();

conn.query('show tables', function(err,data){
	console.log(err);
	let ret = [];
	data.forEach((item)=>{
		ret.push(item.Tables_in_db_bms_english4);
	})

	deal(ret);
})


function deal(data) {
	let item = data.shift();
	if(!item){
		console.log('操作结束');
		return;
	}

	conn.query(`desc ${item}`, (err, result) => {
		if(err){
			console.log(err);
			return;
		}
		console.log(result);
		console.log('go to next');
		deal(data);
	})
}
