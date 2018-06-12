/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_about', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ordernum: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    },
    create_time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'my_about'
  });

  Model.associate = function() {

  }

  return Model;
};
