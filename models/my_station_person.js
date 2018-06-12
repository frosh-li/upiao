/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_station_person', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    Operater: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'my_station_person'
  });

  Model.associate = function() {

  }

  return Model;
};
