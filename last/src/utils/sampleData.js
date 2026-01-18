// 示例数据生成工具

// 生成员工示例数据
export const generateEmployeeData = () => {
  return [
    { id: 1, employeeId: 'EMP001', name: '张三', gender: '男', age: 28, department: '技术部', position: '高级工程师', phone: '13800138001', joinDate: '2020-01-15' },
    { id: 2, employeeId: 'EMP002', name: '李四', gender: '女', age: 25, department: '销售部', position: '销售经理', phone: '13800138002', joinDate: '2020-03-20' },
    { id: 3, employeeId: 'EMP003', name: '王五', gender: '男', age: 32, department: '人事部', position: '人事专员', phone: '13800138003', joinDate: '2019-06-10' },
    { id: 4, employeeId: 'EMP004', name: '赵六', gender: '女', age: 26, department: '财务部', position: '会计', phone: '13800138004', joinDate: '2020-08-05' },
    { id: 5, employeeId: 'EMP005', name: '钱七', gender: '男', age: 30, department: '技术部', position: '前端工程师', phone: '13800138005', joinDate: '2021-02-14' },
    { id: 6, employeeId: 'EMP006', name: '孙八', gender: '女', age: 24, department: '市场部', position: '市场专员', phone: '13800138006', joinDate: '2021-05-20' },
    { id: 7, employeeId: 'EMP007', name: '周九', gender: '男', age: 35, department: '技术部', position: '技术总监', phone: '13800138007', joinDate: '2018-11-01' },
    { id: 8, employeeId: 'EMP008', name: '吴十', gender: '女', age: 27, department: '运营部', position: '运营专员', phone: '13800138008', joinDate: '2020-09-15' },
    { id: 9, employeeId: 'EMP009', name: '郑一', gender: '男', age: 29, department: '销售部', position: '销售专员', phone: '13800138009', joinDate: '2021-01-10' },
    { id: 10, employeeId: 'EMP010', name: '王二', gender: '女', age: 31, department: '人事部', position: '人事经理', phone: '13800138010', joinDate: '2019-04-25' },
    { id: 11, employeeId: 'EMP011', name: '陈三', gender: '男', age: 28, department: '技术部', position: '后端工程师', phone: '13800138011', joinDate: '2020-07-08' },
    { id: 12, employeeId: 'EMP012', name: '林四', gender: '女', age: 26, department: '财务部', position: '出纳', phone: '13800138012', joinDate: '2021-03-12' },
    { id: 13, employeeId: 'EMP013', name: '黄五', gender: '男', age: 33, department: '市场部', position: '市场经理', phone: '13800138013', joinDate: '2019-08-30' },
    { id: 14, employeeId: 'EMP014', name: '杨六', gender: '女', age: 25, department: '运营部', position: '运营经理', phone: '13800138014', joinDate: '2020-11-22' },
    { id: 15, employeeId: 'EMP015', name: '刘七', gender: '男', age: 30, department: '技术部', position: '测试工程师', phone: '13800138015', joinDate: '2021-06-05' }
  ]
}

// 生成请假示例数据
export const generateLeaveData = () => {
  return [
    { id: 1, employeeId: 'EMP001', employeeName: '张三', leaveType: '年假', startDate: '2024-01-10', endDate: '2024-01-12', days: 3, reason: '个人事务', status: '已批准', applyDate: '2024-01-05' },
    { id: 2, employeeId: 'EMP002', employeeName: '李四', leaveType: '病假', startDate: '2024-01-15', endDate: '2024-01-15', days: 1, reason: '身体不适', status: '已批准', applyDate: '2024-01-14' },
    { id: 3, employeeId: 'EMP005', employeeName: '钱七', leaveType: '事假', startDate: '2024-01-20', endDate: '2024-01-21', days: 2, reason: '处理家事', status: '待审批', applyDate: '2024-01-18' },
    { id: 4, employeeId: 'EMP003', employeeName: '王五', leaveType: '年假', startDate: '2024-02-01', endDate: '2024-02-05', days: 5, reason: '旅游', status: '已批准', applyDate: '2024-01-25' },
    { id: 5, employeeId: 'EMP007', employeeName: '周九', leaveType: '调休', startDate: '2024-01-25', endDate: '2024-01-25', days: 1, reason: '调休', status: '已批准', applyDate: '2024-01-22' }
  ]
}

// 生成工资示例数据
export const generateSalaryData = () => {
  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const lastMonth = now.getMonth() === 0 
    ? `${now.getFullYear() - 1}-12`
    : `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`
  
  return [
    // 2024-01月份数据
    { id: 1, employeeId: 'EMP001', employeeName: '张三', department: '技术部', position: '高级工程师', baseSalary: 15000, performance: 3000, allowance: 2000, bonus: 5000, deduction: 500, total: 24500, month: '2024-01' },
    { id: 2, employeeId: 'EMP002', employeeName: '李四', department: '销售部', position: '销售经理', baseSalary: 12000, performance: 8000, allowance: 1500, bonus: 3000, deduction: 400, total: 24100, month: '2024-01' },
    { id: 3, employeeId: 'EMP003', employeeName: '王五', department: '人事部', position: '人事专员', baseSalary: 8000, performance: 1000, allowance: 1000, bonus: 1000, deduction: 300, total: 10700, month: '2024-01' },
    { id: 4, employeeId: 'EMP004', employeeName: '赵六', department: '财务部', position: '会计', baseSalary: 9000, performance: 1500, allowance: 1200, bonus: 1500, deduction: 350, total: 12850, month: '2024-01' },
    { id: 5, employeeId: 'EMP005', employeeName: '钱七', department: '技术部', position: '前端工程师', baseSalary: 13000, performance: 2500, allowance: 1800, bonus: 4000, deduction: 450, total: 21850, month: '2024-01' },
    { id: 6, employeeId: 'EMP006', employeeName: '孙八', department: '市场部', position: '市场专员', baseSalary: 8500, performance: 2000, allowance: 1100, bonus: 2000, deduction: 320, total: 13280, month: '2024-01' },
    { id: 7, employeeId: 'EMP007', employeeName: '周九', department: '技术部', position: '技术总监', baseSalary: 25000, performance: 5000, allowance: 3000, bonus: 10000, deduction: 800, total: 42200, month: '2024-01' },
    { id: 8, employeeId: 'EMP008', employeeName: '吴十', department: '运营部', position: '运营专员', baseSalary: 8800, performance: 1800, allowance: 1000, bonus: 1800, deduction: 310, total: 13090, month: '2024-01' },
    { id: 9, employeeId: 'EMP009', employeeName: '郑一', department: '销售部', position: '销售专员', baseSalary: 7500, performance: 4500, allowance: 900, bonus: 2500, deduction: 280, total: 15120, month: '2024-01' },
    { id: 10, employeeId: 'EMP010', employeeName: '王二', department: '人事部', position: '人事经理', baseSalary: 11000, performance: 2000, allowance: 1500, bonus: 2500, deduction: 380, total: 16620, month: '2024-01' },
    { id: 11, employeeId: 'EMP011', employeeName: '陈三', department: '技术部', position: '后端工程师', baseSalary: 14000, performance: 2800, allowance: 1900, bonus: 4500, deduction: 480, total: 22720, month: '2024-01' },
    { id: 12, employeeId: 'EMP012', employeeName: '林四', department: '财务部', position: '出纳', baseSalary: 7800, performance: 1200, allowance: 950, bonus: 1200, deduction: 290, total: 10860, month: '2024-01' },
    { id: 13, employeeId: 'EMP013', employeeName: '黄五', department: '市场部', position: '市场经理', baseSalary: 11500, performance: 3500, allowance: 1600, bonus: 4000, deduction: 420, total: 20180, month: '2024-01' },
    { id: 14, employeeId: 'EMP014', employeeName: '杨六', department: '运营部', position: '运营经理', baseSalary: 10800, performance: 3000, allowance: 1400, bonus: 3500, deduction: 400, total: 18300, month: '2024-01' },
    { id: 15, employeeId: 'EMP015', employeeName: '刘七', department: '技术部', position: '测试工程师', baseSalary: 12000, performance: 2200, allowance: 1600, bonus: 3000, deduction: 420, total: 18380, month: '2024-01' },
    // 2024-02月份数据（部分员工）
    { id: 16, employeeId: 'EMP001', employeeName: '张三', department: '技术部', position: '高级工程师', baseSalary: 15000, performance: 3200, allowance: 2000, bonus: 5500, deduction: 500, total: 25200, month: '2024-02' },
    { id: 17, employeeId: 'EMP002', employeeName: '李四', department: '销售部', position: '销售经理', baseSalary: 12000, performance: 8500, allowance: 1500, bonus: 3200, deduction: 400, total: 24800, month: '2024-02' },
    { id: 18, employeeId: 'EMP003', employeeName: '王五', department: '人事部', position: '人事专员', baseSalary: 8000, performance: 1100, allowance: 1000, bonus: 1100, deduction: 300, total: 10900, month: '2024-02' },
    { id: 19, employeeId: 'EMP004', employeeName: '赵六', department: '财务部', position: '会计', baseSalary: 9000, performance: 1600, allowance: 1200, bonus: 1600, deduction: 350, total: 13050, month: '2024-02' },
    { id: 20, employeeId: 'EMP005', employeeName: '钱七', department: '技术部', position: '前端工程师', baseSalary: 13000, performance: 2600, allowance: 1800, bonus: 4200, deduction: 450, total: 22150, month: '2024-02' },
    { id: 21, employeeId: 'EMP007', employeeName: '周九', department: '技术部', position: '技术总监', baseSalary: 25000, performance: 5200, allowance: 3000, bonus: 10500, deduction: 800, total: 42900, month: '2024-02' },
    { id: 22, employeeId: 'EMP009', employeeName: '郑一', department: '销售部', position: '销售专员', baseSalary: 7500, performance: 4800, allowance: 900, bonus: 2700, deduction: 280, total: 15620, month: '2024-02' },
    { id: 23, employeeId: 'EMP010', employeeName: '王二', department: '人事部', position: '人事经理', baseSalary: 11000, performance: 2100, allowance: 1500, bonus: 2600, deduction: 380, total: 16820, month: '2024-02' },
    { id: 24, employeeId: 'EMP011', employeeName: '陈三', department: '技术部', position: '后端工程师', baseSalary: 14000, performance: 2900, allowance: 1900, bonus: 4700, deduction: 480, total: 23020, month: '2024-02' },
    { id: 25, employeeId: 'EMP013', employeeName: '黄五', department: '市场部', position: '市场经理', baseSalary: 11500, performance: 3600, allowance: 1600, bonus: 4200, deduction: 420, total: 20480, month: '2024-02' },
    // 当前月份数据（部分员工，示例）
    { id: 26, employeeId: 'EMP001', employeeName: '张三', department: '技术部', position: '高级工程师', baseSalary: 15000, performance: 3000, allowance: 2000, bonus: 5000, deduction: 500, total: 24500, month: currentMonth },
    { id: 27, employeeId: 'EMP002', employeeName: '李四', department: '销售部', position: '销售经理', baseSalary: 12000, performance: 8000, allowance: 1500, bonus: 3000, deduction: 400, total: 24100, month: currentMonth },
    { id: 28, employeeId: 'EMP007', employeeName: '周九', department: '技术部', position: '技术总监', baseSalary: 25000, performance: 5000, allowance: 3000, bonus: 10000, deduction: 800, total: 42200, month: currentMonth },
    { id: 29, employeeId: 'EMP009', employeeName: '郑一', department: '销售部', position: '销售专员', baseSalary: 7500, performance: 4500, allowance: 900, bonus: 2500, deduction: 280, total: 15120, month: currentMonth },
    { id: 30, employeeId: 'EMP011', employeeName: '陈三', department: '技术部', position: '后端工程师', baseSalary: 14000, performance: 2800, allowance: 1900, bonus: 4500, deduction: 480, total: 22720, month: currentMonth },
    { id: 31, employeeId: 'EMP015', employeeName: '刘七', department: '技术部', position: '测试工程师', baseSalary: 12000, performance: 2200, allowance: 1600, bonus: 3000, deduction: 420, total: 18380, month: currentMonth }
  ]
}