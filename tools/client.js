const net = require('net');
const client = net.connect({port: 60026}, () => {
  // 'connect' listener
  console.log('connected to server!');
  setInterval(function(){
  	client.write(`<{"StationErr":{"sn_key":"11606123450000","sid": 12345,"CurErr": 1,"Current": 45.0,"CurLimit": 40.00,"VolErr": 3,"Voltage": 83.70,"VolLimit": 83.00,"HumErr": 2,"Humidity": 86,"HumLimit": 85},"GroupErr":[{"sn_key":"11606123450100","sid": 12345,"gid": 1,"CurSensor": 0,"VolErr": 3,"Voltage": 83.70,"VolLimit": 83.00},{"sn_key":"11606123450200","sid": 12345,"gid": 2,"CurSensor": 1,"CurErr": 1,"Current": 40.0,"CurLimit": 30.00,"VolErr": 3,"Voltage": 83.27,"VolLimit": 83.00}],"BatteryErr":[{"sn_key":"11606123450101","sid": 12345,"gid": 1,"bid": 1,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450102","sid": 12345,"gid": 1,"bid": 2,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450103","sid": 12345,"gid": 1,"bid": 3,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450104","sid": 12345,"gid": 1,"bid": 4,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450105","sid": 12345,"gid": 1,"bid": 5,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450106","sid": 12345,"gid": 1,"bid": 6,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450201","sid": 12345,"gid": 2,"bid": 1,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450202","sid": 12345,"gid": 2,"bid": 2,"TemDevErr": 2,"Temperature": 36.5,"AvgTem": 32.5,"TemDevLimit": 4.0,"RDevErr": 3,"Resistor": 8.2,"AvgRes": 11.66,"ResDevLimit": 3.00},{"sn_key":"11606123450203","sid": 12345,"gid": 2,"bid": 3,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450204","sid": 12345,"gid": 2,"bid": 4,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450205","sid": 12345,"gid": 2,"bid": 5,"VolErr": 3,"Voltage": 13.95,"VolLimit": 13.90,"R_Err": 2,"Resistor": 13.00,"ResLimit": 12.50},{"sn_key":"11606123450206","sid": 12345,"gid": 2,"bid": 6,"TemDevErr": 2,"Temperature": 28.0,"AvgTem": 32.5,"TemDevLimit": 4.0}]}>`);
  },10000);

});
client.on('data', (data) => {
  console.log(data.toString());
  // client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});