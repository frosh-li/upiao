/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_station_device', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.INTEGER(12),
      allowNull: false
    },
    Supervisory_Device_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Supervisory_Device_fun: {
      type: DataTypes.STRING(255),
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
    create_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'my_station_device'
  });

  Model.associate = function() {

  }

  return Model;
};
