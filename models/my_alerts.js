/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_alerts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    climit: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    current: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ignore: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true,
      //  
    },
    markup: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    markuptime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sn_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    contact: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'my_alerts'
  });

  Model.associate = function() {

  }

  return Model;
};
