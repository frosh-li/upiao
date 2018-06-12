/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_slideshow', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    token: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    },
    sortnum: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    created: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'my_slideshow'
  });

  Model.associate = function() {

  }

  return Model;
};
