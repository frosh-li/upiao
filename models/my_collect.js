/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_collect', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stationid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    groupid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    batteryid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    collect_time: {
      type: DataTypes.TIME,
      allowNull: true,
       
    },
    R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    collect_endtime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'my_collect'
  });

  Model.associate = function() {

  }

  return Model;
};
