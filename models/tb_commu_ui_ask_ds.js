/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_commu_ui_ask_ds', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ExcuteEnable: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    UI_Ask_DS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    UI_para1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    UI_para2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    UI_para3: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'tb_commu_ui_ask_ds'
  });

  Model.associate = function() {

  }

  return Model;
};
