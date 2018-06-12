/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_action_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    oldvalue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    newvalue: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    modify_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'my_action_log'
  });

  Model.associate = function() {

  }

  return Model;
};
