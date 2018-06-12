/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_station_alert_desc', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    en: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    limit: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    suggest: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    send_msg: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    send_email: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    tips: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: 'station'
    },
    ignore: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'my_station_alert_desc'
  });

  Model.associate = function() {

  }

  return Model;
};
