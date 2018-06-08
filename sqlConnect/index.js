const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
class SqlConnect {
	constructor(){
		this.models = {};
		this.sequelize = null;
	}

	async connect() {
		this.sequelize =  new Sequelize('db_bms_english4', 'root', 'root', {
			host:'127.0.0.1',
			dialect: 'mysql',
			operatorsAliases: true,
			pool: {
				max: 5,
				min: 0,
				idle: 10000,
				acquire: 30000,
			},
			define: {
				timestamps: false
			}
		});
		await this.sequelize.authenticate();
		this.loadModels();
		return this.sequelize;
	}

	loadModels() {
		const {readdirSync} = fs;
		let files = readdirSync('./models');
		let that = this;
		files.map((file) => {
			this.sequelize.import(this.convertName(file), (app) => {
				return require(path.resolve(__dirname,'../models',file))({
					model:app, 
					Sequelize: app.Sequelize
				});
			});
		})
	}

	convertName(str){
		str = str.replace(".js",'');
		str = str.replace(/_([a-z]{1})/g, (rs, $1)=>{return $1.toUpperCase()});
		return str;
	}
}

module.exports = new SqlConnect();
