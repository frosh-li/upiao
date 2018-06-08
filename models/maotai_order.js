/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('maotai_order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    orderDate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    flagDate: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'maotai_order'
  });

  Model.associate = function() {

  }

  return Model;
};
