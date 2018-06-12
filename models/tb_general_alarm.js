/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_general_alarm', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    record_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_sn: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    alram_equipment: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    equipment_sn: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    alarm_code: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_content: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_emergency_level: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_suggestion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_sms_has_send: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alarm_sms_send_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_email_has_send: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alarm_email_send_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_proces_reaction: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_decide_type: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_read_level: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alarm_orange_level: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alarm_yellow_level: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alarm_green_level: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alarm_para1_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para1_value: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para1_newdata: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para2_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para2_value: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para2_newdata: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para3_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para3_value: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_para3_newdata: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_occur_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_recovered_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_update_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    alarm_process_and_memo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_process_people: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_process_time: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    alarm_cancelled_by_man: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alarm_sound_excuted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alarm_light_excuted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    alarm_memo: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'tb_general_alarm'
  });

  Model.associate = function() {

  }

  return Model;
};
