/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_battery_parameter', {
    battery_sn_key: {
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
    bid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    CurrentAdjust_KV: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TemperatureAdjust_KT: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    T0_ADC: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T0_Temperature: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T1_ADC: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    T1_Temperature: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Rin_Span: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    OSC: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    BatteryU_H: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    BaterryU_L: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Electrode_T_H_Limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Electrode_T_L_Limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Rin_High_Limit: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    Rin_Adjust_KR: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PreAmp_KA: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Rin_ExciteI_KI: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'tb_battery_parameter'
  });

  Model.associate = function() {

  }

  return Model;
};
