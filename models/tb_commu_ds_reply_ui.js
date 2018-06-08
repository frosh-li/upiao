/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_commu_ds_reply_ui', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DS_Reply_UI: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DS_para1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DS_para2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DS_para3: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'tb_commu_ds_reply_ui'
  });

  Model.associate = function() {

  }

  return Model;
};
