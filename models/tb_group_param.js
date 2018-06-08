/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_group_param', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    GroBatNum: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '6'
    },
    CurRange: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '100'
    },
    KI: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.03125'
    },
    ZeroCurADC: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '2400'
    },
    DisChaLim_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '30'
    },
    DisChaLim_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '28'
    },
    DisChaLim_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '25'
    },
    ChaLim_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '-20'
    },
    ChaLim_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '-18'
    },
    ChaLim_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '-15'
    },
    MaxTem_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '60'
    },
    MaxTem_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '55'
    },
    MaxTem_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '50'
    },
    MinTem_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '3'
    },
    MinTem_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '5'
    },
    MinTem_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '9'
    },
    ChaCriterion: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.5'
    },
    MaxHumi_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '90'
    },
    MaxHumi_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '85'
    },
    MaxHumi_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '80'
    },
    MinHumi_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '8'
    },
    MinHumi_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '5'
    },
    MinHumi_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '3'
    }
  }, {
    tableName: 'tb_group_param'
  });

  Model.associate = function() {

  }

  return Model;
};
