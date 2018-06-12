/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_program_gerneral_parameters', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time_for_db_write_interval: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    b_station_basic_infor_changed: {
      type: DataTypes.INTEGER(8),
      allowNull: true
    },
    N_histroy_average_number: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    station_delta_I_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    battery_delta_U_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    battery_delta_R_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    battery_delta_T_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    group_delta_I_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    group_delta_U_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    group_delta_T_write_history_db: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    memo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_program_gerneral_parameters'
  });

  Model.associate = function() {

  }

  return Model;
};
