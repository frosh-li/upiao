/**
 * 消息发送测试接口
 */

var crypto = require('crypto');

var md5 = crypto.createHash('md5');

var request = require('request');

var config = require('./config');

const pass = tomd5(config.pass);

function tomd5(pass){
    md5.update(pass);
    var sign = md5.digest('hex');
    return sign.toUpperCase();
}

function getbizId(){
    var now = new Date();
    var ret= now.toLocaleDateString().replace(/[-:\/]/g,"")+now.toLocaleTimeString().replace(/[-:\/]/g,"");

    console.log('bizId', ret);
    return ret;
}

function sendmsg(mobile, content){
    let postData = {
        accName:config.user,
        accPwd:pass,
        aimcodes:mobile,
        content:content+"【BMS】",
        bizId:getbizId(),
        dataType:"json"
    };
    console.log('posturl', config.url)
    console.log('postData',postData);
    return new Promise((resolve, reject)=>{
    
        request({
            method:"post",
            url:config.url,
            json:true,
            form:postData,
            body:postData
        }, function(err,_,body){
            if(err){
                console.log(err);
                return reject(err);
            }
            console.log(body);
            return resolve(body);
        })
    
    })
}

module.exports = sendmsg;
