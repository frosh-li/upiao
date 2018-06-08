/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_station_basic_information', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sid: {
      type: DataTypes.INTEGER(12),
      allowNull: false
    },
    StationSimpleChineseName: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    StationFullChineseName: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Station_Address: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Post_Code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Manager_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Manager_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Manager_cable_phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Emergency_contact_people: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Emergency_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Groups_of_battery: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Number_of_batteries_per_group: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_factroy_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_type_or_SN: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_manufactory_date: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_install_date: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_power: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_rated_backup_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_charge_mode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_Max_Charge_current: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_Max_DisCharge_Current: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UPS_Formal_Maintence_Time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_factory_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_type_or_SN: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_manufactory_date: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_rated_voltage: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_rated_resistance: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_max_charge_current: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_floating_charge_upper_limit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_floating_charge_lower_limit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_discharge_voltage_lower_limit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Design_life_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    User_company_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Computer_OS: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Computer_configuration: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Center_manage_department: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Center_manager_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Center_manager_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Center_manager_cablephone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater2: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater3: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater4: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater5: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater1_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater2_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater3_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater4_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Operater5_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone_1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone_2: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone_3: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone_4: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_cellphone_5: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_emal_1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_emal_2: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_emal_3: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_emal_4: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Alarm_SMS_receive_emal_5: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_Address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_PostCode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_website: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_Technology_cable_phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Device_Factory_Technology_cellphone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Station_Controller_Type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Station_Controller_Quantity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Group_Current_Sampler_Type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Group_Current_Sampler_Quantity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Current_Sensor_Install_Mode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_Data_Sampler_Type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Battery_Data_Sampler_Quantity: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Supervisory_Software_Version: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Memo: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'tb_station_basic_information'
  });

  Model.associate = function() {

  }

  return Model;
};
