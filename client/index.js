'use strict';
const net = require('net');
const errors = require('./data_tpl/error.js');
//console.log(errors);
var mock = require("./generater.js");
function startClient(sn_key){
let client = net.connect({
    port: 60026
}, () => {
    // 'connect' listener
    console.log('connected to server!');
    setInterval(function() {
        var data = mock(sn_key);
        client.write(data);
    }, 1000*60*30); // 30分钟发送一次数据，其他时间发送
    setInterval(() => {
        client.write(`<{"sn_key":${sn_key},"sid":${sn_key.toString().substring(7,10)}}>`)
    },1000*10); // 10秒发送一次心跳包

    setInterval(() => {
        // 30秒发送一次报警数据
        client.write(`<${JSON.stringify(errors)}>`)
    }, 1000*10)
});
client.on('data', (data) => {
    console.log(data.toString());
    let incoming = data.toString('utf-8').replace(/[<>]/g, '');
    incoming = JSON.parse(incoming);
    if(incoming.FuncSel && incoming.FuncSel.Operator === 3){
        // 发送一次站数据
        let cdata = mock(sn_key);
        client.write(cdata);
    }
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
    console.log('reconnect after 5s');
    setTimeout(()=>{
        startClient(sn_key);
    },5000)
});
client.on('error', (error)=> {
    console.log("some error", error);
    client.end();
})
}

var clients = process.argv[2] || 1;
var start = process.argv[3] || 2222222222;
for(var i = 0 ; i < clients ; i++){
    (function(i){
    
        startClient((start+i)*10000);

    })(i)
}
/*
['1160612346'].forEach(function(item){
    startClient(item*10000);
})
*/
