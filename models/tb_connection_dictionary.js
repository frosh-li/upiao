/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_connection_dictionary', {
    ip: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    station_ID: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    station_ChineseName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_connection_dictionary'
  });

  Model.associate = function() {

  }

  return Model;
};
