/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_bms_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bms_company: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bms_device_addr: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bms_postcode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bms_url: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    bms_tel: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bms_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bms_service_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bms_service_contact: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    bms_service_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    bms_service_url: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    bms_version: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    bms_update_mark: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bms_mark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    modify_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'my_bms_info'
  });

  Model.associate = function() {

  }

  return Model;
};
