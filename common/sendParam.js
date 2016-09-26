/**
 * 获取最新硬件参数
 *
 * 设置硬件参数
 *
 * */

var StationPar = [
	"sn_key",
	"CurSensor",
	"sid",
	"Groups",
	"GroBats",
	"Time_MR",
	"SampleInt",
	"MaxTem_R",
	"MaxTem_O",
	"MaxTem_Y",
	"MinTem_R",
	"MinTem_O",
	"MinTem_Y",
	"MaxHum_R",
	"MaxHum_O",
	"MaxHum_Y",
	"MinHum_R",
	"MinHum_O",
	"MinHum_Y",
	"CurRange",
	"KI",
	"ZeroCurADC",
	"DisChaLim_R",
	"DisChaLim_O",
	"DisChaLim_Y",
	"ChaLim_R",
	"ChaLim_O",
	"ChaLim_Y",
	"HiVolLim_R",
	"HiVolLim_O",
	"HiVolLim_Y",
	"LoVolLim_R",
	"LoVolLim_O",
	"LoVolLim_Y",
	"GroCurDevLim_R",
	"GroCurDevLim_0",
	"GroCurDevLim_Y",
	"GroVolDevLim_R",
	"GroVolDevLim_0",
	"GroVolDevLim_Y",
	"GroTTemDevLim_R",
	"GroTemDevLim_0",
	"GroTemDevLim_Y",
	"ChaCriterion",
	"FloChaVol",
];

function getParam(ctype, body){
	
}

module.exports = function(ctype, body){
	var ret = {};
	if(ctype == "StationPar"){
		StationPar.forEach(function(item){
			ret[item] = body[item];	
		})
	}
	var writeData = JSON.stringify(ret);
	console.log(writeData);
	sockets[body.sn_key] && sockets[body.sn_key].write(`<${writeData}>`);
}
