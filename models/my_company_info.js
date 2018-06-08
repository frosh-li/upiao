/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_company_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    company_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    supervisor_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    supervisor_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    longitude: {
      type: "DOUBLE",
      allowNull: false
    },
    latitude: {
      type: "DOUBLE",
      allowNull: false
    },
    station_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    area_level: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    network_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bandwidth: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    ipaddr: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    computer_brand: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    computer_os: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    computer_conf: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    browser_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    server_capacity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    server_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cloud_address: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    backup_period: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    backup_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    supervisor_depname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    monitor_name1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    monitor_phone1: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    monitor_name2: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    monitor_phone2: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    monitor_name3: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    monitor_phone3: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    monitor_tel1: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    monitor_tel2: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    modify_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    area_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_area: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    duty_status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    manage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    viewer: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'my_company_info'
  });

  Model.associate = function() {

  }

  return Model;
};
