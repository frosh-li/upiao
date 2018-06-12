/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_ds_working_parameters', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    SampleSoftwareStarted: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    DataSamplingStarted: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    ConnectedStation: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    sample_interval: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    sound_light_com_port: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sms_com_port: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    light_alarm_is_ON: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    sound_alarm_is_ON: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    sms_is_Send: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    email_is_Send: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    error_infor: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nR_Buffer: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    nS_Buffer: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    }
  }, {
    tableName: 'tb_ds_working_parameters'
  });

  Model.associate = function() {

  }

  return Model;
};
