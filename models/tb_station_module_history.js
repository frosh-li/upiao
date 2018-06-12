/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_station_module_history', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    record_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    Groups: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '2'
    },
    GroBats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '20'
    },
    TemCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    HumCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Humidity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    CurCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Current: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    VolCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Voltage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Capacity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '100.00'
    },
    Lifetime: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '100.00'
    },
    ChaState: {
      type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
      allowNull: true
    },
    BatteryHealth: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    BackupTime: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    Status1: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    Status2: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CurSensor: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_station_module_history'
  });

  Model.associate = function() {

  }

  return Model;
};
