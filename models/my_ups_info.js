/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_ups_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ups_factory: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ups_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ups_create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ups_install_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ups_power: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    redundancy_num: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    floting_charge: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    ups_vdc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ups_reserve_hour: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    ups_charge_mode: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ups_max_charge: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    ups_max_discharge: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    ups_period_days: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    ups_discharge_time: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    ups_discharge_capacity: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    ups_maintain_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ups_vender: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    ups_vender_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ups_service: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ups_service_phone: {
      type: DataTypes.STRING(20),
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
    ups_power_in: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ups_power_out: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ups_battery_vol: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ups_battery_current: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ac_protect: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dc_protect: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    on_net: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    alarm_content: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    discharge_protect: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'my_ups_info'
  });

  Model.associate = function() {

  }

  return Model;
};
