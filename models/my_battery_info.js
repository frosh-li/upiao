/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_battery_info', {
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
    battery_factory: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    battery_num: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    battery_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    battery_dianrong: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_float_voltage: {
      type: "DOUBLE(12,2)",
      allowNull: false
    },
    battery_voltage: {
      type: "DOUBLE(12,2)",
      allowNull: false
    },
    battery_oum: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_max_discharge_current: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_max_current: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_float_up: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_float_dow: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_discharge_down: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_scrap_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    battery_life: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_column_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    battery_humidity: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_temperature: {
      type: "DOUBLE(10,2)",
      allowNull: false
    },
    battery_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    battery_factory_phone: {
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
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'my_battery_info'
  });

  Model.associate = function() {

  }

  return Model;
};
