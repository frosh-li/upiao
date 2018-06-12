/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_alarm_siteconf', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    suggest: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    send_email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    send_msg: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    alarm_type: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    type_value: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    operator: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    judge_type: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    can_ignore: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    alarm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    alarm_code: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'my_alarm_siteconf'
  });

  Model.associate = function() {

  }

  return Model;
};
