'use strict';
var stationTpl = require("./data_tpl/station.js").replace(/\s/g,"");
var groupTpl = require("./data_tpl/group.js").replace(/\s/g,"");
var batteryTpl = require("./data_tpl/battery.js").replace(/\s/g,"");
var sn_keys = require("./sn_keys.js");
var groupCount = 2,
    batteryCount = 3;

var sn_key = "11606123450000";
var sid = 12345;
function genMock(i_sn_key){
    if(i_sn_key){
        sn_key = i_sn_key.toString();
    }
    console.log(sn_key, i_sn_key);
    var ret = {};
    ret.StationData = replaceData(stationTpl);
    ret.GroupData = [];
    ret.GroupData.push(replaceData(groupTpl,0));
    ret.GroupData.push(replaceData(groupTpl,1));
    ret.BatteryData = [];
    ret.BatteryData.push(replaceData(batteryTpl,0,0));
    ret.BatteryData.push(replaceData(batteryTpl,0,1));
    ret.BatteryData.push(replaceData(batteryTpl,0,2));
    ret.BatteryData.push(replaceData(batteryTpl,1,0));
    ret.BatteryData.push(replaceData(batteryTpl,1,1));
    ret.BatteryData.push(replaceData(batteryTpl,1,2));
    return `<${JSON.stringify(ret)}>`;
}
function replaceData(input,index,gid){
    let stationTpl = input;
    var match = stationTpl.match(/{[^{}]*}/g);
    /**
     * 动态替换
     */
    let csn_key = sn_key.toString();
    if(index !== undefined){
        csn_key = sn_key.substring(0,11)+(index+1).toString() + sn_key.substring(12,14);
    }
    if(gid !== undefined){
        csn_key = csn_key.substring(0,13)+(gid+1).toString();
    }
    match.forEach(function(item){
        if(item === "{sn_key}"){
            stationTpl = stationTpl.replace("{sn_key}", csn_key);
        }

        if(item === "{sid}"){
            stationTpl = stationTpl.replace("{sid}", sid);
        }

        if(item === "{index}"){
            stationTpl = stationTpl.replace("{index}", index+1);
        }
        if(item === "{gid}"){
            stationTpl = stationTpl.replace("{gid}", gid+1);
        }

        var o = item.replace(/[{}]/g,"").split("|");
        if(o.length === 2){
            // 数组格式
            let ctype = o[0];
            let range = JSON.parse(o[1]);
            if(ctype === "array"){
                let cindex = Math.floor(Math.random()*3);
                stationTpl = stationTpl.replace(item, range[cindex]);

            }
        }

        if(o.length === 3){
            var ctype = o[0],
                odata = o[1],
                range = parseInt(o[2]);
            if(ctype === "float"){
                odata = parseFloat(odata);
                let newData = Math.random()*range+1;

                if(Math.ceil(Math.random()*2) === 1){
                    odata += newData;
                }else{
                    odata -= newData;
                }
                odata = odata.toFixed(2);
                stationTpl = stationTpl.replace(item, odata);
            }


            if(ctype === "int"){
                let newData = Math.floor(Math.random()*range+1);
                odata = parseInt(odata);
                if(Math.ceil(Math.random()*2) === 1){
                    odata += newData;
                }else{
                    odata -= newData;
                }
                stationTpl = stationTpl.replace(item, odata);
            }
        }
    })
    return JSON.parse(stationTpl);
}
if(process.argv[4] === "test"){
    let out = genMock();
    console.log(out.replace(/<>/mg,""));
}
module.exports = genMock;
