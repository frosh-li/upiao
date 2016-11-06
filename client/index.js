'use strict';
const net = require('net');

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
    }, 5000);

});
client.on('data', (data) => {
    console.log(data.toString());
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
})
}

var clients = process.argv[2] || 1;
/*
for(var i = 0 ; i < clients ; i++){
    (function(i){
    
        startClient((1160612345+i)*1000);

    })(i)
}
*/
['1160612346'].forEach(function(item){
    startClient(item*10000);
})
