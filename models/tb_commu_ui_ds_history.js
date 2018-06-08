/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_commu_ui_ds_history', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_UI_to_DS: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cmd_content: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    para1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    para2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    para3: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'tb_commu_ui_ds_history'
  });

  Model.associate = function() {

  }

  return Model;
};
