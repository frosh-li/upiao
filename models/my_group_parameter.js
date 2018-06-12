/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_group_parameter', {
    id: {
      type: DataTypes.INTEGER(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.STRING(20),
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
    tableName: 'my_group_parameter'
  });

  Model.associate = function() {

  }

  return Model;
};
