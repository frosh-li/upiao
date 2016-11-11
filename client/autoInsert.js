var mysql = require('mysql');
const CONFIG = {
    db:{
        host:"127.0.0.1",
        user:"root",
        password:"",
        database: "db_bms_english4",
        multipleStatements:true,
        dateStrings:true
    }
}
global.conn = mysql.createConnection(CONFIG.db);

var areas = [
    17,
    47,
    25,
    51,
    49,
    54,
    55,
    56
];

new Promise(function(resolve, reject){
    conn.query("delete from my_site where site_name like '%22222%'");
    conn.query("select * from my_site where serial_number=11606123260000", function(err, ret){
        if(err){
            console.log(err);
            return reject(err);
        }
        var newSite = ret[0];
        delete newSite.id;
        resolve(newSite)
    })
}).then(function(site){
    console.log(site);
    var start_sn_key = 2222222220;
    var insertsPromise = [];
    for(var i = 0 ; i < 100 ; i++){
        let newSite = site;
        newSite.site_name = `${start_sn_key+i}`;
        newSite.StationFullChineseName = `${start_sn_key+i}`;
        newSite.serial_number = `${start_sn_key+i}0000`;
        newSite.aid = areas[Math.random()*areas.length >> 0];
        insertsPromise.push(new Promise(function(resolve, reject){
            conn.query('insert into my_site set ?', newSite, function(err, inserted){
                if(err){
                    console.log('insert error', newSite.serial_number, err.message);
                    return reject(err);
                }
                console.log('insert done', newSite.serial_number);
                return resolve("yes", newSite.serial_number);
            })
        }))
    }

    Promise.all(insertsPromise, function(err, results){
        console.log(err);
        console.log(results);
    })
})
