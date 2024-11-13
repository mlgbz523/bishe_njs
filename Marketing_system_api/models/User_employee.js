'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt'); // 导入 bcrypt

module.exports = (sequelize, DataTypes) => {
  class UserEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserEmployee.belongsTo(models.UserDepartment, { // 员工属于一个部门
        foreignKey: 'dept_id',
        targetKey: 'dept_id',
        as: 'department',
      });

      UserEmployee.belongsTo(models.UserRole, { // 员工拥有一个角色
        foreignKey: 'role_id',
        targetKey: 'role_id',
        as: 'role',
      });
    }
  }
  UserEmployee.init({
    emp_user_id: {
      type: DataTypes.STRING(12),
      primaryKey: true,
      allowNull: false,
      comment: '职员用户ID',
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  //  自增 ID
      unique: true,          // 唯一约束
      allowNull: false,
    },
    real_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '真实姓名',
    },
    gender: {
      type: DataTypes.ENUM('0', '1'), // 定义枚举值
      allowNull: true,
      comment: '性别 (0: 男, 1: 女)',
    },
    dept_id: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: '部门ID',
    },
    contact_info: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '联系方式',
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // 添加唯一约束
      comment: '用户名',
    },
    // password: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    //   comment: '密码',
    // },
    password: {
      type: DataTypes.STRING(255), // 建议指定长度，例如 STRING(255)
      allowNull: false,
      set(value) {
        // 检查是否为空
        if (!value) {
          throw new Error('密码不能为空。'); // 更友好的错误信息
        }

        // 检查长度
        if (value.length < 5 || value.length > 20) {
          throw new Error('密码长度必须在 5 到 20 个字符之间。'); //  更友好的错误信息
        }

        // 使用 bcrypt 加密密码
        const hashedPassword = bcrypt.hashSync(value, 10); //  同步加密
        this.setDataValue('password', hashedPassword);
      },
      validate: { // 添加验证规则
        len: [5, 20], // 长度验证
      }
    },
    role_id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      comment: '系统角色ID',
    },
    last_login_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '上次登录时间',
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false, // 通常创建时间不能为空
      defaultValue: DataTypes.NOW,
      comment: '创建时间',
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '更新时间',
    },
    updated_by: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: '更新人 - 员工ID',
    },
    status: {
      type: DataTypes.ENUM('0', '1'),  // 定义枚举值
      allowNull: true,
      defaultValue: '1',
      comment: '状态 (1: 启用, 0: 禁用)',
    },
  }, {
    sequelize,
    modelName: 'UserEmployee',
    tableName: 'User_employee',  //  指定表名
    //  paranoid: true,         //  如果需要逻辑删除，取消注释
    //  deletedAt: 'deleted_at', //  如果需要逻辑删除，并自定义 deletedAt 字段名，取消注释
  });
  return UserEmployee;
};