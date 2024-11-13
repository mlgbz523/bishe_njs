'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDepartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDepartment.hasMany(models.UserEmployee, { // 一个部门可以有多个员工
        foreignKey: 'dept_id',
        sourceKey: 'dept_id',  // 确保 sourceKey 与主键或唯一键匹配
        as: 'employees',
      });
1

      // 可选：添加与 UserEmployee 的 manager 关联。
      // 请仔细阅读之前的说明，了解潜在问题和注意事项
      UserDepartment.belongsTo(models.UserEmployee, {
        foreignKey: 'manager_id',
        targetKey: 'emp_user_id',
        as: 'manager',
      });

    }
  }
  UserDepartment.init({
    dept_id: {
      type: DataTypes.STRING(12),  // 指定长度
      primaryKey: true,
      allowNull: false,
      comment: '部门ID',  // 添加注释 (可选)
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,       //  联合主键
      allowNull: false,
    },
    dept_name: {
      type: DataTypes.STRING(50),  // 指定长度
      allowNull: false,
      comment: '部门名称',
    },
    description: {
      type: DataTypes.STRING(255),  // 指定长度
      allowNull: true,
      comment: '部门描述',
    },
    manager_id: {
      type: DataTypes.STRING(12),  // 指定长度
      allowNull: true,
      comment: '部门经理 - 员工ID',
    },
  }, {
    sequelize,
    modelName: 'UserDepartment',
    tableName: 'User_departments', // 明确指定表名
    timestamps: false, // 禁用时间戳
    comment: '部门表', //  为表添加注释 (可选)
  });
  return UserDepartment;
};