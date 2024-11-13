'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserEmployee.init({
    emp_user_id: DataTypes.STRING,
    id: DataTypes.INTEGER,
    real_name: DataTypes.STRING,
    gender: DataTypes.ENUM,
    dept_id: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    last_login_time: DataTypes.DATE,
    create_time: DataTypes.DATE,
    update_time: DataTypes.DATE,
    updated_by: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'UserEmployee',
  });
  return UserEmployee;
};