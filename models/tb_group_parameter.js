/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_group_parameter', {
    group_sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    gid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    K_Battery_Incide: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    HaveCurrentSensor: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    StationCurrentSensorSpan: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    StationCurrentSensorZeroADCode: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    OSC: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    DisbytegeCurrentLimit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    bytegeCurrentLimit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    TemperatureHighLimit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    TemperatureLowLimit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    HumiH: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    HumiL: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    TemperatureAdjust: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    HumiAdjust: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    }
  }, {
    tableName: 'tb_group_parameter'
  });

  Model.associate = function() {

  }

  return Model;
};
