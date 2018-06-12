/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_config', {
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'my_config'
  });

  Model.associate = function() {

  }

  return Model;
};
