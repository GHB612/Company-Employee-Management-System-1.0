<template>
  <div class="leave-management">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="card-title">员工请假管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">添加请假记录</el-button>
        </div>
      </template>

      <!-- 搜索和筛选 -->
      <div class="filter-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索员工姓名或工号..."
          :prefix-icon="Search"
          clearable
          style="max-width: 300px; margin-right: 15px;"
          @input="handleSearch"
        />
        <el-select
          v-model="filterStatus"
          placeholder="筛选状态"
          clearable
          style="max-width: 150px; margin-right: 15px;"
          @change="handleSearch"
        >
          <el-option label="待审批" value="待审批" />
          <el-option label="已批准" value="已批准" />
          <el-option label="已拒绝" value="已拒绝" />
        </el-select>
        <el-select
          v-model="filterLeaveType"
          placeholder="筛选类型"
          clearable
          style="max-width: 150px;"
          @change="handleSearch"
        >
          <el-option label="年假" value="年假" />
          <el-option label="病假" value="病假" />
          <el-option label="事假" value="事假" />
          <el-option label="调休" value="调休" />
        </el-select>
      </div>

      <!-- 表格 -->
      <el-table
        :data="currentPageLeaves"
        stripe
        style="width: 100%; margin-top: 20px;"
        v-loading="loading"
        empty-text="暂无数据"
      >
        <el-table-column prop="employeeId" label="工号" width="120" />
        <el-table-column prop="employeeName" label="姓名" width="120" />
        <el-table-column prop="leaveType" label="请假类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getLeaveTypeTag(row.leaveType)">{{ row.leaveType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="开始日期" width="120" />
        <el-table-column prop="endDate" label="结束日期" width="120" />
        <el-table-column prop="days" label="天数" width="80" align="center" />
        <el-table-column prop="reason" label="请假原因" min-width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applyDate" label="申请日期" width="120" />
        <el-table-column label="操作" width="240" fixed="right" align="center">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                v-if="row.status === '待审批'"
                type="success"
                size="small"
                @click="handleApprove(row)"
              >
                批准
              </el-button>
              <el-button
                v-if="row.status === '待审批'"
                type="danger"
                size="small"
                @click="handleReject(row)"
              >
                拒绝
              </el-button>
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
          :total="filteredLeaves.length"
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
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
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
        <el-form-item label="员工姓名" prop="employeeName">
          <el-input v-model="form.employeeName" disabled />
        </el-form-item>
        <el-form-item label="请假类型" prop="leaveType">
          <el-select v-model="form.leaveType" placeholder="请选择请假类型" style="width: 100%;">
            <el-option label="年假" value="年假" />
            <el-option label="病假" value="病假" />
            <el-option label="事假" value="事假" />
            <el-option label="调休" value="调休" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="请选择开始日期"
            style="width: 100%;"
            value-format="YYYY-MM-DD"
            @change="calculateDays"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="请选择结束日期"
            style="width: 100%;"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledEndDate"
            @change="calculateDays"
          />
        </el-form-item>
        <el-form-item label="天数" prop="days">
          <el-input-number
            v-model="form.days"
            :min="0.5"
            :step="0.5"
            placeholder="自动计算"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="请假原因" prop="reason">
          <el-input
            v-model="form.reason"
            type="textarea"
            :rows="3"
            placeholder="请输入请假原因"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" v-if="isEdit">
          <el-radio-group v-model="form.status">
            <el-radio label="待审批">待审批</el-radio>
            <el-radio label="已批准">已批准</el-radio>
            <el-radio label="已拒绝">已拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
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
import { generateLeaveData, generateEmployeeData } from '@/utils/sampleData'

const STORAGE_KEY = 'leaves'
const EMPLOYEE_STORAGE_KEY = 'employees'

// 数据
const leaves = ref([])
const employees = ref([])
const searchText = ref('')
const filterStatus = ref('')
const filterLeaveType = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// 表单数据
const form = ref({
  employeeId: '',
  employeeName: '',
  leaveType: '',
  startDate: '',
  endDate: '',
  days: 1,
  reason: '',
  status: '待审批',
  applyDate: ''
})

// 表单验证规则
const rules = {
  employeeId: [{ required: true, message: '请选择员工', trigger: 'change' }],
  leaveType: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
  endDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
  days: [{ required: true, message: '请输入天数', trigger: 'blur' }],
  reason: [{ required: true, message: '请输入请假原因', trigger: 'blur' }]
}

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑请假记录' : '添加请假记录')

const filteredLeaves = computed(() => {
  let result = leaves.value

  if (searchText.value.trim()) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(leave =>
      leave.employeeName.toLowerCase().includes(keyword) ||
      leave.employeeId.toLowerCase().includes(keyword)
    )
  }

  if (filterStatus.value) {
    result = result.filter(leave => leave.status === filterStatus.value)
  }

  if (filterLeaveType.value) {
    result = result.filter(leave => leave.leaveType === filterLeaveType.value)
  }

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredLeaves.value.length / pageSize.value)
})

const currentPageLeaves = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredLeaves.value.slice(start, end)
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

const loadLeaves = () => {
  const saved = storage.get(STORAGE_KEY)
  if (saved && saved.length > 0) {
    leaves.value = saved
  } else {
    leaves.value = generateLeaveData()
    saveLeaves()
  }
}

const saveLeaves = () => {
  storage.set(STORAGE_KEY, leaves.value)
}

const handleEmployeeChange = (employeeId) => {
  const employee = employees.value.find(emp => emp.employeeId === employeeId)
  if (employee) {
    form.value.employeeName = employee.name
  }
}

const calculateDays = () => {
  if (form.value.startDate && form.value.endDate) {
    const start = new Date(form.value.startDate)
    const end = new Date(form.value.endDate)
    if (end >= start) {
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      form.value.days = diffDays
    }
  }
}

const disabledEndDate = (time) => {
  if (form.value.startDate) {
    return time.getTime() < new Date(form.value.startDate).getTime()
  }
  return false
}

const getLeaveTypeTag = (type) => {
  const map = {
    '年假': 'success',
    '病假': 'warning',
    '事假': 'info',
    '调休': ''
  }
  return map[type] || ''
}

const getStatusTag = (status) => {
  const map = {
    '待审批': 'warning',
    '已批准': 'success',
    '已拒绝': 'danger'
  }
  return map[status] || ''
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleApprove = (row) => {
  ElMessageBox.confirm('确定要批准该请假申请吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    row.status = '已批准'
    saveLeaves()
    ElMessage.success('批准成功')
  }).catch(() => {})
}

const handleReject = (row) => {
  ElMessageBox.confirm('确定要拒绝该请假申请吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    row.status = '已拒绝'
    saveLeaves()
    ElMessage.success('已拒绝')
  }).catch(() => {})
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除该请假记录吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    leaves.value = leaves.value.filter(l => l.id !== row.id)
    saveLeaves()
    if (currentPageLeaves.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
    ElMessage.success('删除成功')
  }).catch(() => {})
}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        const index = leaves.value.findIndex(l => l.id === form.value.id)
        if (index !== -1) {
          leaves.value[index] = { ...form.value }
          saveLeaves()
          ElMessage.success('更新成功')
        }
      } else {
        const newId = leaves.value.length > 0
          ? Math.max(...leaves.value.map(l => l.id)) + 1
          : 1
        leaves.value.push({
          id: newId,
          ...form.value,
          applyDate: new Date().toISOString().split('T')[0],
          status: '待审批'
        })
        saveLeaves()
        ElMessage.success('添加成功')
      }
      dialogVisible.value = false
      resetForm()
    }
  })
}

const resetForm = () => {
  form.value = {
    employeeId: '',
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    days: 1,
    reason: '',
    status: '待审批',
    applyDate: ''
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
  loadLeaves()
})
</script>

<style scoped>
.leave-management {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>