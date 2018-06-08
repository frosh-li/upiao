/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_adminuser', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    salt: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    catalog: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    profile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipaddress: {
      type: DataTypes.CHAR(15),
      allowNull: false
    },
    last_login_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    create_user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_user_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'my_adminuser'
  });

  Model.associate = function() {

  }

  return Model;
};
