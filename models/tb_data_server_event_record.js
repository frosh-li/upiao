/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_data_server_event_record', {
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
    IP: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    GID: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Station: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    infor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    infortype: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_data_server_event_record'
  });

  Model.associate = function() {

  }

  return Model;
};
