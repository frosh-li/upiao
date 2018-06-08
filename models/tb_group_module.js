/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_group_module', {
    sn_key: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    record_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    gid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    VolCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Voltage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    GroBats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '6'
    },
    ChaState: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    CurCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Current: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TemCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    Temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Status1: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    Status2: {
      type: DataTypes.CHAR(4),
      allowNull: true
    },
    Memo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Avg_U: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Avg_T: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Avg_R: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Humidity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    HumCol: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_group_module'
  });

  Model.associate = function() {

  }

  return Model;
};
