'use strict';
global.colors = require('colors');
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

global.clients = {};
global.sockets = {};

require('./tcpserver').start();

require('./httpserver').start();

