/**
 * 模拟站数据格式
 *
 * */

var data = `{
    "sn_key": "{sn_key}",
    "CurSensor": "101",
    "sid": {sid},
    "Groups":2,
    "GroBats":6,
    "Current": {float|25.03|5},
    "CurCol":{array|[0,1,2,3]},
    "Voltage": {float|127.38|100},
    "VolCol":{array|[0,1,2,3]},
    "Temperature": {float|34.2|30},
    "TemCol":{array|[0,1,2,3]},
    "Humidity": {int|78|20},
    "HumCol":{array|[0,1,2,3]},
    "ChaState": {array|[0,1,2]},
    "Lifetime":{int|50|50},
    "Capacity":{int|50|50}
}`;

module.exports = data;
