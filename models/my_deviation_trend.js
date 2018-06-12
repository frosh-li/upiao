/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_deviation_trend', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    gid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sn_key: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    U: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0.00'
    },
    T: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0.00'
    },
    R: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: '0'
    },
    EU: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0.00'
    },
    ET: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0.00'
    },
    ER: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: '0'
    },
    record_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'my_deviation_trend'
  });

  Model.associate = function() {

  }

  return Model;
};
