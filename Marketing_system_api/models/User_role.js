'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.hasMany(models.UserEmployee, { // 一个角色可以被多个员工使用
        foreignKey: 'role_id',
        sourceKey: 'role_id', //  使用 role_id 作为源键
        as: 'employees',
      });
    }
  }
  UserRole.init({
    role_id: {
      type: DataTypes.STRING(12),
      primaryKey: true,
      allowNull: false,
      comment: '角色ID',
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // 联合主键
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '角色名称',
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '角色描述',
    }
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'User_roles', //  明确指定表名
    timestamps: false,        // 禁用时间戳
    comment: '角色表',      //  添加表注释（可选）
  });
  return UserRole;
};