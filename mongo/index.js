const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bms');
const AlertSchema = require('../schemas/alert.schema.js');
const Alert = mongoose.model('Alert', AlertSchema);

var alert = new Alert({
	"code":"00",
	"climit": 100,
	"current": 80,
	"ignore": 0
});

alert.save((err) => {
	if(err){
		console.log(err);
		return;
	}

	console.log("save document success");
})
