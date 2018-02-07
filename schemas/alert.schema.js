//+------------+--------------+------+-----+-------------------+-----------------------------+
//	| Field      | Type         | Null | Key | Default           | Extra                       |
//	+------------+--------------+------+-----+-------------------+-----------------------------+
//	| id         | int(11)      | NO   | PRI | NULL              | auto_increment              |
//	| code       | varchar(200) | NO   |     | NULL              |                             |
//	| climit     | varchar(200) | YES  |     | NULL              |                             |
//	| current    | varchar(200) | YES  |     | NULL              |                             |
//	| ignore     | int(1)       | NO   |     | 0                 |                             |
//	| time       | timestamp    | YES  |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
//	| markup     | text         | YES  |     | NULL              |                             |
//	| markuptime | timestamp    | YES  |     | NULL              |                             |
//	| sn_key     | varchar(255) | YES  |     | NULL              |                             |
//	| type       | varchar(255) | YES  |     | NULL              |                             |
//	| status     | int(1)       | YES  |     | 0                 |                             |
//	| contact    | varchar(200) | YES  |     | NULL              |                             |
//	+------------+--------------+------+-----+-------------------+-----------------------------+
//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Alert = new Schema({
	id: Schema.Types.ObjectId,
	code:String,
	climit:Number,
	current:Number,
	ignore: Number,
	time: {type: Date, default: Date.now},
	markup: {type: String},
	markuptime: {type: Date},
	sn_key: {type: String, index: true},
	type: {type: String},
	status: {type: Number},
	contact: {type: String}
});

module.exports = Alert;
