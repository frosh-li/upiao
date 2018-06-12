/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_running_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    modify_time: {
      type: DataTypes.DATE,
      allowNull: false,
       
    }
  }, {
    tableName: 'my_running_log'
  });

  Model.associate = function() {

  }

  return Model;
};
