/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_ignores', {
    sn_key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    updateTime: {
      type: DataTypes.TIME,
      allowNull: false,
       
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    markup: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operator: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'my_ignores'
  });

  Model.associate = function() {

  }

  return Model;
};
