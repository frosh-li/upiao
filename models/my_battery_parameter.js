/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_battery_parameter', {
    id: {
      type: DataTypes.INTEGER(12).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BaterryU_L: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Electrode_T_H_Limit: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Electrode_T_L_Limit: {
      type: DataTypes.FLOAT,
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
    tableName: 'my_battery_parameter'
  });

  Model.associate = function() {

  }

  return Model;
};
