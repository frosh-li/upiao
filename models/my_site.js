/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_site', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    site_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    StationFullChineseName: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    serial_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    site_property: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    site_location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    site_chname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    site_longitude: {
      type: "DOUBLE",
      allowNull: true
    },
    site_latitude: {
      type: "DOUBLE",
      allowNull: true
    },
    ipaddress: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ipaddress_method: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    site_control_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    emergency_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    emergency_person: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    groups: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    batteries: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    battery_status: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    bms_install_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    group_collect_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    group_collect_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    inductor_brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    inductor_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    group_collect_install_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    battery_collect_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    battery_collect_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    humiture_type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    is_checked: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '1'
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fix_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    functionary: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    functionary_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    device_owner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    device_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    has_light: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_speaker: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_sms: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_smart_control: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    has_group_TH_control: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: ''
    },
    has_group_HO_control: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    device_mac: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    functionary_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    functionary_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    area_owner_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    area_owner_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    parent_owner_mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    parent_owner_sms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    area_owner: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    area_owner_phone: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    CurSensor: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'my_site'
  });

  Model.associate = function() {

  }

  return Model;
};
