/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('my_channels', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    cid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    channeltype: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    systemtype: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    ordernum: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    ishidden: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    positions: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ''
    },
    alias: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ''
    },
    title: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    seotitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    metakeywords: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    metadesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    target: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    create_time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    update_time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'my_channels'
  });

  Model.associate = function() {

  }

  return Model;
};
