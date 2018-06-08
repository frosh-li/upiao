/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_station_param', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CurSensor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '101'
    },
    sid: {
      type: DataTypes.STRING(200),
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
      defaultValue: '6'
    },
    Time_MR: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '604800'
    },
    Time_MV: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '10'
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
      defaultValue: '2'
    },
    MinTem_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '5'
    },
    MinTem_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '8'
    },
    MaxHum_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '90'
    },
    MaxHum_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '85'
    },
    MaxHum_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '80'
    },
    MinHum_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '1'
    },
    MinHum_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '4'
    },
    MinHum_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '7'
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
      defaultValue: '40'
    },
    DisChaLim_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '35'
    },
    DisChaLim_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '30'
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
      defaultValue: '-16'
    },
    HiVolLim_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '89'
    },
    HiVolLim_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '86'
    },
    HiVolLim_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '83'
    },
    LoVolLim_R: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '63'
    },
    LoVolLim_O: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '65'
    },
    LoVolLim_Y: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '67'
    },
    ChaCriterion: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0.8'
    },
    SampleInt: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'tb_station_param'
  });

  Model.associate = function() {

  }

  return Model;
};
