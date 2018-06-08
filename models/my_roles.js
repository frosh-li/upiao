/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_roles', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    rolename: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'my_roles'
  });

  Model.associate = function() {

  }

  return Model;
};
