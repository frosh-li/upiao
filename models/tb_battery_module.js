/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_battery_module', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    record_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    gid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    mid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    bid: {
      type: DataTypes.INTEGER(10),
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
    TemCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    DrvCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    DrvCurrent: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ResCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Resistor: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PredictCapacity: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    Eff_N: {
      type: DataTypes.INTEGER(10),
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
    NowStatus: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    AmpRange: {
      type: DataTypes.CHAR(4),
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
    Memo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    DevUCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Dev_U: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
    },
    DevRCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Dev_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
    },
    DevTCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Dev_T: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
    },
    Humidity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    HumCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_battery_module'
  });

  Model.associate = function() {

  }

  return Model;
};
