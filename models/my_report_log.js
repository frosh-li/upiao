/* jshint indent: 2 */

module.exports = (app) =>  
  {
    const DataTypes = app.Sequelize;
    const sequelize = app.model;
  return sequelize.define('my_report_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    report_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    report_table: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    report_index: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    report_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'my_report_log'
  });
};
