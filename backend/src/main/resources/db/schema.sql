-- 员工信息管理系统数据库表结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS employee_management DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE employee_management;

-- 员工表
CREATE TABLE IF NOT EXISTS employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    employee_id VARCHAR(50) NOT NULL UNIQUE COMMENT '工号',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    gender VARCHAR(10) NOT NULL COMMENT '性别',
    age INT NOT NULL COMMENT '年龄',
    department VARCHAR(50) NOT NULL COMMENT '部门',
    position VARCHAR(50) NOT NULL COMMENT '职位',
    phone VARCHAR(20) NOT NULL COMMENT '联系方式',
    join_date DATE NOT NULL COMMENT '入职日期',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_employee_id (employee_id),
    INDEX idx_department (department),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工信息表';

-- 初始化示例数据
INSERT INTO employees (employee_id, name, gender, age, department, position, phone, join_date) VALUES
('EMP001', '张三', '男', 28, '技术部', '高级工程师', '13800138001', '2020-01-15'),
('EMP002', '李四', '女', 25, '销售部', '销售经理', '13800138002', '2020-03-20'),
('EMP003', '王五', '男', 32, '人事部', '人事专员', '13800138003', '2019-06-10'),
('EMP004', '赵六', '女', 26, '财务部', '会计', '13800138004', '2020-08-05'),
('EMP005', '钱七', '男', 30, '技术部', '前端工程师', '13800138005', '2021-02-14'),
('EMP006', '孙八', '女', 24, '市场部', '市场专员', '13800138006', '2021-05-20'),
('EMP007', '周九', '男', 35, '技术部', '技术总监', '13800138007', '2018-11-01'),
('EMP008', '吴十', '女', 27, '运营部', '运营专员', '13800138008', '2020-09-15'),
('EMP009', '郑一', '男', 29, '销售部', '销售专员', '13800138009', '2021-01-10'),
('EMP010', '王二', '女', 31, '人事部', '人事经理', '13800138010', '2019-04-25'),
('EMP011', '陈三', '男', 28, '技术部', '后端工程师', '13800138011', '2020-07-08'),
('EMP012', '林四', '女', 26, '财务部', '出纳', '13800138012', '2021-03-12'),
('EMP013', '黄五', '男', 33, '市场部', '市场经理', '13800138013', '2019-08-30'),
('EMP014', '杨六', '女', 25, '运营部', '运营经理', '13800138014', '2020-11-22'),
('EMP015', '刘七', '男', 30, '技术部', '测试工程师', '13800138015', '2021-06-05');