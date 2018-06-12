/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_battery_param', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    KV: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.004333'
    },
    KT: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '-0.129'
    },
    KI: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.001'
    },
    T0: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '23.5'
    },
    ADC_T0: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '2400'
    },
    T1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '60'
    },
    ADC_T1: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '2090'
    },
    MaxU_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '14.1'
    },
    MaxU_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '14'
    },
    MaxU_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '13.9'
    },
    MinU_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '10.2'
    },
    MinU_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '10.5'
    },
    MinU_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '10.8'
    },
    MaxT_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '55'
    },
    MaxT_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '50'
    },
    MaxT_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '45'
    },
    MinT_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '3'
    },
    MinT_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '6'
    },
    MinT_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '9'
    },
    MaxR_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '15'
    },
    MaxR_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '12.5'
    },
    MaxR_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '10'
    },
    MaxDevU_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.5'
    },
    MaxDevU_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.4'
    },
    MaxDevU_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.3'
    },
    MaxDevT_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '5'
    },
    MaxDevT_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '4'
    },
    MaxDevT_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '3'
    },
    MaxDevR_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '5'
    },
    MaxDevR_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '4'
    },
    MaxDevR_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '3'
    }
  }, {
    tableName: 'tb_battery_param'
  });

  Model.associate = function() {

  }

  return Model;
};
