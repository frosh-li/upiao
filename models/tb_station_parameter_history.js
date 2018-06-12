/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_station_parameter_history', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    station_sn_key: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    MAC_address: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    N_Groups_Incide: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Time_interval_Rin: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Time_interval_U: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    U_abnormal_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T_abnormal_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Rin_abnormal_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T_upper_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T_lower_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Humi_upper_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Humi_lower_limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Group_I_criterion: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    bytegeStatus_U_upper: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    bytegeStatus_U_lower: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    FloatingbytegeStatus_U_upper: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    FloatingbytegeStatus_U_lower: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    DisbytegeStatus_U_upper: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    DisbytegeStatus_U_lower: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    N_Groups_Incide_Station: {
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
    tableName: 'tb_station_parameter_history'
  });

  Model.associate = function() {

  }

  return Model;
};
