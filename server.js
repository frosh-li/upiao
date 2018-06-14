'use strict';
global.colors = require('colors');
global.logger = require('js-logging').console();
var mysql = require('mysql');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
});
// 加载配置文件
const CONFIG = require("./config");
global.conn = null;
global.formatData = require("./common/formatDate.js");
global.clients = {};
global.comClients = {'127.0.0.1':{'odata':''}};
global.sockets = {};

function autoConnMysql(){
    conn = mysql.createConnection(CONFIG.db);
    conn.connect(function(err){
        if(err){
            console.error('error on connecting', err.stack);
            logger.info('数据库连接失败，10秒后进行重连');
            setTimeout(autoConnMysql , 10000);
            return;
        }else{
            console.log('数据库连接成功,connected as id ', conn.threadId);
        }
    });
    conn.on('error', (err)=> {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            logger.info('数据库断开连接，10秒后进行重连');
            autoConnMysql();
        }else{
            throw err;
        }
    })
}

autoConnMysql();

require('./httpserver').start();
require('./comserver').start();
