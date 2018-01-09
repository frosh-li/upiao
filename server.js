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
global.conn = mysql.createConnection(CONFIG.db);
global.formatData = require("./common/formatDate.js");
global.clients = {};
global.comClients = {};
global.sockets = {};

conn.connect(function(err){
    if(err){
        console.error('error on connecting', err.stack);
        return;
    }
    console.log('connected as id ', conn.threadId);
})

require('./tcpserver').start();

require('./httpserver').start();
require('./comserver').start();
