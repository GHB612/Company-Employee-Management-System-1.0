/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80043 (8.0.43)
 Source Host           : localhost:3306
 Source Schema         : employee_management

 Target Server Type    : MySQL
 Target Server Version : 80043 (8.0.43)
 File Encoding         : 65001

 Date: 07/01/2026 16:53:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `employee_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '工号',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '性别',
  `age` int NOT NULL COMMENT '年龄',
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '部门',
  `position` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '职位',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '联系方式',
  `join_date` date NOT NULL COMMENT '入职日期',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `employee_id`(`employee_id` ASC) USING BTREE,
  INDEX `idx_employee_id`(`employee_id` ASC) USING BTREE,
  INDEX `idx_department`(`department` ASC) USING BTREE,
  INDEX `idx_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '员工信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES (1, 'EMP001', '张三', '男', 28, '技术部', '高级工程师', '13800138001', '2020-01-15', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (2, 'EMP002', '李四', '女', 25, '销售部', '销售经理', '13800138002', '2020-03-20', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (3, 'EMP003', '王五', '男', 32, '人事部', '人事专员', '13800138003', '2019-06-10', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (4, 'EMP004', '赵六', '女', 26, '财务部', '会计', '13800138004', '2020-08-05', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (5, 'EMP005', '钱七', '男', 30, '技术部', '前端工程师', '13800138005', '2021-02-14', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (6, 'EMP006', '孙八', '女', 24, '市场部', '市场专员', '13800138006', '2021-05-20', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (7, 'EMP007', '周九', '男', 35, '技术部', '技术总监', '13800138007', '2018-11-01', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (8, 'EMP008', '吴十', '女', 27, '运营部', '运营专员', '13800138008', '2020-09-15', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (9, 'EMP009', '郑一', '男', 29, '销售部', '销售专员', '13800138009', '2021-01-10', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (10, 'EMP010', '王二', '女', 31, '人事部', '人事经理', '13800138010', '2019-04-25', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (11, 'EMP011', '陈三', '男', 28, '技术部', '后端工程师', '13800138011', '2020-07-08', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (12, 'EMP012', '林四', '女', 26, '财务部', '出纳', '13800138012', '2021-03-12', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (13, 'EMP013', '黄五', '男', 33, '市场部', '市场经理', '13800138013', '2019-08-30', '2026-01-07 08:35:33', '2026-01-07 08:35:33');
INSERT INTO `employees` VALUES (16, 'emp014', 'gg', '男', 18, '技术部', '程序员', '15555555555', '2026-01-14', '2026-01-07 16:41:43', '2026-01-07 16:41:43');

SET FOREIGN_KEY_CHECKS = 1;
