<template>
  <div class="salary-management">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="card-title">员工工资管理</span>
          <div class="header-actions">
            <el-select
              v-model="selectedMonth"
              placeholder="选择月份"
              style="width: 150px; margin-right: 10px;"
              @change="handleMonthChange"
            >
              <el-option
                v-for="month in monthOptions"
                :key="month.value"
                :label="month.label"
                :value="month.value"
              />
            </el-select>
            <el-button type="primary" :icon="Plus" @click="handleAdd">添加工资记录</el-button>
          </div>
        </div>
      </template>

      <!-- 统计卡片 -->
      <el-row :gutter="20" class="statistics-cards">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">{{ statistics.totalCount }}</div>
              <div class="stat-label">员工总数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">￥{{ statistics.totalSalary.toLocaleString() }}</div>
              <div class="stat-label">工资总额</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">￥{{ statistics.avgSalary.toLocaleString() }}</div>
              <div class="stat-label">平均工资</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="stat-item">
              <div class="stat-value">￥{{ statistics.totalBonus.toLocaleString() }}</div>
              <div class="stat-label">奖金总额</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索员工姓名或工号..."
          :prefix-icon="Search"
          clearable
          style="max-width: 300px; margin-right: 15px;"
          @input="handleSearch"
        />
        <el-select
          v-model="filterDepartment"
          placeholder="筛选部门"
          clearable
          style="max-width: 150px;"
          @change="handleSearch"
        >
          <el-option label="技术部" value="技术部" />
          <el-option label="销售部" value="销售部" />
          <el-option label="人事部" value="人事部" />
          <el-option label="财务部" value="财务部" />
          <el-option label="市场部" value="市场部" />
          <el-option label="运营部" value="运营部" />
        </el-select>
      </div>

      <!-- 表格 -->
      <el-table
        :data="currentPageSalaries"
        stripe
        style="width: 100%; margin-top: 20px;"
        v-loading="loading"
        empty-text="暂无数据"
      >
        <el-table-column prop="month" label="月份" width="100" fixed="left" />
        <el-table-column prop="employeeId" label="工号" width="120" />
        <el-table-column prop="employeeName" label="姓名" width="120" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="position" label="职位" width="150" />
        <el-table-column prop="baseSalary" label="基本工资" width="120" align="right">
          <template #default="{ row }">
            ￥{{ row.baseSalary.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="performance" label="绩效" width="120" align="right">
          <template #default="{ row }">
            ￥{{ row.performance.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="allowance" label="津贴" width="120" align="right">
          <template #default="{ row }">
            ￥{{ row.allowance.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="bonus" label="奖金" width="120" align="right">
          <template #default="{ row }">
            ￥{{ row.bonus.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="deduction" label="扣除" width="120" align="right">
          <template #default="{ row }">
            ￥{{ row.deduction.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="实发工资" width="140" align="right" fixed="right">
          <template #default="{ row }">
            <span class="total-salary">￥{{ row.total.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right" align="center">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredSalaries.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="月份" prop="month">
              <el-date-picker
                v-model="form.month"
                type="month"
                placeholder="请选择月份"
                style="width: 100%;"
                value-format="YYYY-MM"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="员工工号" prop="employeeId">
              <el-select
                v-model="form.employeeId"
                placeholder="请选择员工"
                filterable
                style="width: 100%;"
                @change="handleEmployeeChange"
              >
                <el-option
                  v-for="emp in employees"
                  :key="emp.employeeId"
                  :label="`${emp.employeeId} - ${emp.name}`"
                  :value="emp.employeeId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="员工姓名" prop="employeeName">
              <el-input v-model="form.employeeName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="department">
              <el-input v-model="form.department" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">工资组成</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="基本工资" prop="baseSalary">
              <el-input-number
                v-model="form.baseSalary"
                :min="0"
                :precision="2"
                style="width: 100%;"
                @change="calculateTotal"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绩效" prop="performance">
              <el-input-number
                v-model="form.performance"
                :min="0"
                :precision="2"
                style="width: 100%;"
                @change="calculateTotal"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="津贴" prop="allowance">
              <el-input-number
                v-model="form.allowance"
                :min="0"
                :precision="2"
                style="width: 100%;"
                @change="calculateTotal"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="奖金" prop="bonus">
              <el-input-number
                v-model="form.bonus"
                :min="0"
                :precision="2"
                style="width: 100%;"
                @change="calculateTotal"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="扣除" prop="deduction">
              <el-input-number
                v-model="form.deduction"
                :min="0"
                :precision="2"
                style="width: 100%;"
                @change="calculateTotal"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实发工资" prop="total">
              <el-input-number
                v-model="form.total"
                :precision="2"
                disabled
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { storage } from '@/utils/storage'
import { generateSalaryData, generateEmployeeData } from '@/utils/sampleData'

const STORAGE_KEY = 'salaries'
const EMPLOYEE_STORAGE_KEY = 'employees'

// 数据
const salaries = ref([])
const employees = ref([])
const searchText = ref('')
const filterDepartment = ref('')
const selectedMonth = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// 表单数据
const form = ref({
  month: '',
  employeeId: '',
  employeeName: '',
  department: '',
  position: '',
  baseSalary: 0,
  performance: 0,
  allowance: 0,
  bonus: 0,
  deduction: 0,
  total: 0
})

// 表单验证规则
const rules = {
  month: [{ required: true, message: '请选择月份', trigger: 'change' }],
  employeeId: [{ required: true, message: '请选择员工', trigger: 'change' }],
  baseSalary: [{ required: true, message: '请输入基本工资', trigger: 'blur' }]
}

// 月份选项（最近12个月）
const monthOptions = computed(() => {
  const options = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = `${date.getFullYear()}年${date.getMonth() + 1}月`
    options.push({ value, label })
  }
  return options
})

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑工资记录' : '添加工资记录')

const filteredSalaries = computed(() => {
  let result = salaries.value

  // 月份筛选
  if (selectedMonth.value) {
    result = result.filter(salary => salary.month === selectedMonth.value)
  }

  // 搜索筛选
  if (searchText.value.trim()) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(salary =>
      salary.employeeName.toLowerCase().includes(keyword) ||
      salary.employeeId.toLowerCase().includes(keyword)
    )
  }

  // 部门筛选
  if (filterDepartment.value) {
    result = result.filter(salary => salary.department === filterDepartment.value)
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredSalaries.value.length / pageSize.value)
})

const currentPageSalaries = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredSalaries.value.slice(start, end)
})

const statistics = computed(() => {
  const data = filteredSalaries.value
  const totalCount = data.length
  const totalSalary = data.reduce((sum, item) => sum + item.total, 0)
  const avgSalary = totalCount > 0 ? Math.round(totalSalary / totalCount) : 0
  const totalBonus = data.reduce((sum, item) => sum + item.bonus, 0)

  return {
    totalCount,
    totalSalary,
    avgSalary,
    totalBonus
  }
})

// 方法
const loadEmployees = () => {
  const saved = storage.get(EMPLOYEE_STORAGE_KEY)
  if (saved && saved.length > 0) {
    employees.value = saved
  } else {
    employees.value = generateEmployeeData()
    storage.set(EMPLOYEE_STORAGE_KEY, employees.value)
  }
}

const loadSalaries = () => {
  const saved = storage.get(STORAGE_KEY)
  // 如果没有数据或数据量太少（少于10条），则重新生成示例数据
  if (!saved || saved.length < 10) {
    salaries.value = generateSalaryData()
    saveSalaries()
  } else {
    salaries.value = saved
  }
  // 默认选中当前月份
  if (!selectedMonth.value && monthOptions.value.length > 0) {
    selectedMonth.value = monthOptions.value[0].value
  }
}

const saveSalaries = () => {
  storage.set(STORAGE_KEY, salaries.value)
}

const handleEmployeeChange = (employeeId) => {
  const employee = employees.value.find(emp => emp.employeeId === employeeId)
  if (employee) {
    form.value.employeeName = employee.name
    form.value.department = employee.department
    form.value.position = employee.position
  }
}

const calculateTotal = () => {
  form.value.total = Math.round(
    (form.value.baseSalary || 0) +
    (form.value.performance || 0) +
    (form.value.allowance || 0) +
    (form.value.bonus || 0) -
    (form.value.deduction || 0)
  )
}

const handleMonthChange = () => {
  currentPage.value = 1
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  if (!form.value.month && selectedMonth.value) {
    form.value.month = selectedMonth.value
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除该工资记录吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    salaries.value = salaries.value.filter(s => s.id !== row.id)
    saveSalaries()
    if (currentPageSalaries.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      // 检查该员工该月是否已有工资记录
      const exists = salaries.value.some(
        s => s.employeeId === form.value.employeeId &&
        s.month === form.value.month &&
        (!isEdit.value || s.id !== form.value.id)
      )

      if (exists) {
        ElMessage.error('该员工该月已有工资记录！')
        return
      }

      if (isEdit.value) {
        const index = salaries.value.findIndex(s => s.id === form.value.id)
        if (index !== -1) {
          salaries.value[index] = { ...form.value }
          saveSalaries()
          ElMessage.success('更新成功')
        }
      } else {
        const newId = salaries.value.length > 0
          ? Math.max(...salaries.value.map(s => s.id)) + 1
          : 1
        salaries.value.push({
          id: newId,
          ...form.value
        })
        saveSalaries()
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
      resetForm()
    }
  })
}

const resetForm = () => {
  form.value = {
    month: '',
    employeeId: '',
    employeeName: '',
    department: '',
    position: '',
    baseSalary: 0,
    performance: 0,
    allowance: 0,
    bonus: 0,
    deduction: 0,
    total: 0
  }
  formRef.value?.clearValidate()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handlePageChange = (val) => {
  currentPage.value = val
}

onMounted(() => {
  loadEmployees()
  loadSalaries()
})
</script>

<style scoped>
.salary-management {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.header-actions {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.statistics-cards {
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.total-salary {
  font-size: 16px;
  font-weight: bold;
  color: #f56c6c;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>