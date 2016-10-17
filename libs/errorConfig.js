var errCodes = {
	station:{
		"TemErr":[
			"Temperature", // 第一位是current值的字段
			"MaxTem_R",
			"MaxTem_O",
			"MaxTem_Y",
			"MinTem_R",
			"MinTem_O",
			"MinTem_Y",
			"TemSenErr",
		],// 环境温度报警

		"HumErr":[
			"Humidity",
			"MaxHum_R",
			"MaxHum_O",
			"MaxHum_Y",
			"MinHum_R",
			"MinHum_O",
			"MinHum_Y",
		],// 环境湿度报警

		"CurErr":[
			"Current",
			"DisChaLim_R",
			"DisChaLim_O",
			"DisChaLim_Y",
			"ChaLim_R",
			"ChaLim_O",
			"ChaLim_Y",
			"CurSenErr",
		],

		"VolErr":[
			"Voltage",
			"HiVolLim_R",
			"HiVolLim_O",
			"HiVolLim_Y",
			"LoVolLim_R",
			"LoVolLim_O",
			"LoVolLim_Y",
		],
		// 站电压报警

		"GroCurDevLim":[
			"CurDev",// 当前偏差值
			"GroCurDevLim_R",
			"GroCurDevLim_0",
			"GroCurDevLim_Y",
		],
		"GroVolDevLim":[
			"VolDev", // 当前电压偏差值
			"GroVolDevLim_R",
			"GroVolDevLim_0",
			"GroVolDevLim_Y",
		],
		"GroTemDevLim":[
			"TemDev",// 当前温度偏压值
			"GroTTemDevLim_R",
			"GroTemDevLim_0",
			"GroTemDevLim_Y",
		]
	},
	group:{
		"CurErr":[
			"Current",
			"DisChaLim_R",
			"DisChaLim_O",
			"DisChaLim_Y",
			"ChaLim_R",
			"ChaLim_O",
			"ChaLim_Y",
			"CurSenErr",
		],
		"TemErr":[
			"Temperature",
			"MaxTem_R",
			"MaxTem_O",
			"MaxTem_Y",
			"MinTem_R",
			"MinTem_O",
			"MinTem_Y",
		]
	},
	battery:{
		"VolErr":[
			"Voltage",
			"MaxU_R",
			"MaxU_O",
			"MaxU_Y",
			"MinU_R",
			"MinU_O",
			"MinU_Y",
			"VolSenErr",
		],
		"TemErr":[
			"Temperature",
			"MaxT_R",
			"MaxT_O",
			"MaxT_Y",
			"MinT_R",
			"MinT_O",
			"MinT_Y",
			"TemSenErr",
		],
		"ResErr":[
			"Resistor",
			"MaxR_R",
			"MaxR_O",
			"MaxR_Y",
			"ResSenErr",
		],
		"VolDevErr":[
			"AvgVol",
			"MaxDevU_R",
			"MaxDevU_O",
			"MaxDevU_Y",
		],
		"TemDevErr":[
			"AvgTem",
			"MaxDevT_R",
			"MaxDevT_O",
			"MaxDevT_Y",
		],
		"RDevErr":[
			"AvgR",
			"MaxDevR_R",
			"MaxDevR_O",
			"MaxDevR_Y",
		]
	}
};

module.exports = errCodes;