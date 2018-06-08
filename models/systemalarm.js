/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('systemalarm', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    station: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tips: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    record_time: {
      type: DataTypes.TIME,
      allowNull: true,
       
    }
  }, {
    tableName: 'systemalarm'
  });

  Model.associate = function() {

  }

  return Model;
};
