/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_dataserver_alarm', {
    sn: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true
    },
    alarm_type: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    sid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    gid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    mid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    bid: {
      type: DataTypes.INTEGER(12),
      allowNull: true
    },
    alarm_infor: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_dataserver_alarm'
  });

  Model.associate = function() {

  }

  return Model;
};
