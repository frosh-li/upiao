/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_links', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    ordernum: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    create_time: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'my_links'
  });

  Model.associate = function() {

  }

  return Model;
};
