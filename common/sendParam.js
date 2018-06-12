/**
 * 获取最新硬件参数
 *
 * 设置硬件参数
 *
 * */

const StationPar = [
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

const GroupPar = [
	"GroBatNum",
	"CurRange",
	"KI",
	"ZeroCurADC",
	"DisChaLim_R",
	"DisChaLim_O",
	"DisChaLim_Y",
	"ChaLim_R",
	"ChaLim_O",
	"ChaLim_Y",
	"MaxTem_R",
	"MaxTem_O",
	"MaxTem_Y",
	"MinTem_R",
	"MinTem_O",
	"MinTem_Y",
	"ChaCriterion",
];

const BatteryPar = [
	"KV",
	"KT",
	"KI",
	"T0",
	"ADC_T0",
	"T1",
	"ADC_T1",
	"MaxU_R",
	"MaxU_O",
	"MaxU_Y",
	"MinU_R",
	"MinU_O",
	"MinU_Y",
	"MaxT_R",
	"MaxT_O",
	"MaxT_Y",
	"MinT_R",
	"MinT_O",
	"MinT_Y",
	"MaxR_R",
	"MaxR_O",
	"MaxR_Y",
	"MaxDevU_R",
	"MaxDevU_O",
	"MaxDevU_Y",
	"MaxDevT_R",
	"MaxDevT_O",
	"MaxDevT_Y",
	"MaxDevR_R",
	"MaxDevR_O",
	"MacDevR_Y",
];

const ParamList = {
	StationPar: StationPar,
	GroupPar: GroupPar,
	BatteryPar: BatteryPar,
}

module.exports = function(ctype, body){
	let ret = {};
	if(ctype == "StationPar"){
		ret.StationPar = {};
		StationPar.forEach(function(item,index){
			let cindex = (index-2) <10 ?("0"+(index-2)):(index-2+"");
			if (index < 2) {
				ret.StationPar[item] = body[item];
			} else {
				if(body[item]){
					ret.StationPar[cindex] = parseFloat(body[item]);
				}
			}
		});
	}

	if(ctype === "GroupPar" || ctype === "BatteryPar"){
		ret[ctype] = {};
		ParamList[ctype].forEach(function(item,index){
			let cindex = (index) <10 ?("0"+(index)):(index+"");
			if(body[item]){
				ret[ctype][cindex] = parseFloat(body[item]);
			}
		});
	}

	/**
	 * 如果传入空直接返回
	 */
	if(Object.keys(ret).length === 0){
		return;
	}
	let writeData = JSON.stringify(ret);
	logger.info("send Data to Hard", writeData);
	sockets[body.sn_key] && sockets[body.sn_key].write(`<${writeData}>`);
}
