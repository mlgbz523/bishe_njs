const express = require('express');
const router = express.Router();
const { UserDepartment, UserEmployee } = require('../../models'); // 导入两个模型
const { NotFoundError, BadRequestError } = require('../../utils/errors');
const { success, failure } = require('../../utils/responses');
const { Op } = require('sequelize');

// 白名单过滤
function filterBody(req) {
    return {
        dept_name: req.body.dept_name,
        description: req.body.description,
        manager_id: req.body.manager_id, //  允许修改 manager_id
    };
}


// 检查 manager_id 是否有效
async function validateManagerId(managerId) {
    if (managerId) { // 仅当提供了 manager_id 时才进行验证
        const employee = await UserEmployee.findByPk(managerId);
        if (!employee) {
            throw new BadRequestError(`员工ID ${managerId} 不存在。`);
        }
    }
}


/**
 * 获取部门列表
 * GET /departments
 */
router.get('/', async (req, res) => {
    try {
        const departments = await UserDepartment.findAll({
            attributes: ['dept_id', 'dept_name', 'description', 'manager_id'],
            include: [{ model: UserEmployee, as: 'manager', attributes: ['real_name','username'] }], // Include manager with real_name
            order: [['dept_id', 'ASC']],
        });

        res.status(200).json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '获取部门信息失败' });
    }
});


/**
 * 获取指定部门信息
 * GET /departments/:id
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const department = await UserDepartment.findByPk(id,{
            include: [{ model: UserEmployee, as: 'manager', attributes: ['real_name','username'] }], // Include manager with real_name
        });
        if (!department) {
            throw new NotFoundError(`部门ID ${id} 不存在`);
        }
        success(res, '查询部门信息成功。', { department });
    } catch (error) {
        failure(res, error);
    }
});



/**
 * 创建新部门
 * POST /departments
 */
router.post('/', async (req, res) => {
    try {
        await validateManagerId(req.body.manager_id); // 验证 manager_id
        const department = await UserDepartment.create(filterBody(req));
        success(res, '创建部门成功。', { department }, 201);
    } catch (error) {
        failure(res, error);
    }
});



/**
 * 更新部门信息
 * PUT /departments/:id
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await validateManagerId(req.body.manager_id);  //  验证 manager_id
        const department = await UserDepartment.findByPk(id);

        if (!department) {
            throw new NotFoundError(`部门ID ${id} 不存在。`);
        }

        await department.update(filterBody(req));
        success(res, '更新部门信息成功。', { department });
    } catch (error) {
        failure(res, error);
    }
});




/**
 * 删除部门
 * DELETE /departments/:id
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const department = await UserDepartment.findByPk(id);
        if (!department) {
            throw new NotFoundError(`部门ID ${id} 不存在。`);
        }
        await department.destroy();
        success(res, '删除部门成功。');
    } catch (error) {
        failure(res, error);
    }
});


module.exports = router;