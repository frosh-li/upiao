/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('tb_force_rin_measure_result', {
    sn_key: {
      type: DataTypes.INTEGER(12),
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
    bid: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    Rin: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'tb_force_rin_measure_result'
  });

  Model.associate = function() {

  }

  return Model;
};
