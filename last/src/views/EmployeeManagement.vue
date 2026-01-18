<template>
  <div class="employee-management">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="card-title">员工管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">添加员工</el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索员工姓名、工号或部门..."
          :prefix-icon="Search"
          clearable
          @input="handleSearch"
          style="max-width: 400px;"
        />
      </div>

      <!-- 表格 -->
      <el-table
        v-if="!loading || currentPageEmployees.length > 0"
        :data="currentPageEmployees"
        stripe
        style="width: 100%; margin-top: 20px;"
        v-loading="loading"
        empty-text="暂无数据"
      >
        <el-table-column prop="employeeId" label="工号" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="gender" label="性别" width="80" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="department" label="部门" width="120" />
        <el-table-column prop="position" label="职位" width="150" />
        <el-table-column prop="phone" label="联系方式" width="140" />
        <el-table-column prop="joinDate" label="入职日期" width="120" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total || 0"
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
        <el-form-item label="工号" prop="employeeId">
          <el-input
            v-model="form.employeeId"
            placeholder="请输入工号"
            :disabled="isEdit"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number
            v-model="form.age"
            :min="18"
            :max="100"
            placeholder="请输入年龄"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="form.department" placeholder="请选择部门" style="width: 100%;">
            <el-option label="技术部" value="技术部" />
            <el-option label="销售部" value="销售部" />
            <el-option label="人事部" value="人事部" />
            <el-option label="财务部" value="财务部" />
            <el-option label="市场部" value="市场部" />
            <el-option label="运营部" value="运营部" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="入职日期" prop="joinDate">
          <el-date-picker
            v-model="form.joinDate"
            type="date"
            placeholder="请选择入职日期"
            style="width: 100%;"
            value-format="YYYY-MM-DD"
          />
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
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search, Edit, Delete } from '@element-plus/icons-vue'
import { employeeAPI } from '@/utils/api'

// 数据
const employees = ref([])
const total = ref(0)
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// 初始化数据，确保employees是数组
if (!Array.isArray(employees.value)) {
  employees.value = []
}

// 表单数据
const form = ref({
  employeeId: '',
  name: '',
  gender: '',
  age: null,
  department: '',
  position: '',
  phone: '',
  joinDate: ''
})

// 表单验证规则
const rules = {
  employeeId: [{ required: true, message: '请输入工号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  joinDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }]
}

// 计算属性
const dialogTitle = computed(() => isEdit.value ? '编辑员工' : '添加员工')

const totalPages = computed(() => {
  if (!total.value) return 1
  return Math.ceil(total.value / pageSize.value)
})

const currentPageEmployees = computed(() => {
  if (!Array.isArray(employees.value)) {
    return []
  }
  return employees.value
})

// 方法
const loadEmployees = async () => {
  // 确保employees始终是数组
  if (!Array.isArray(employees.value)) {
    employees.value = []
  }
  
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value
    }
    
    if (searchText.value && searchText.value.trim()) {
      params.keyword = searchText.value.trim()
    }
    
    const response = await employeeAPI.getList(params)
    
    // 检查响应
    if (response && response.code === 200 && Array.isArray(response.data)) {
      employees.value = response.data
      total.value = response.total || 0
    } else {
      // API返回错误或数据格式不正确
      console.warn('API响应:', response)
      employees.value = []
      total.value = 0
      // 不显示错误提示，让页面正常显示"暂无数据"
    }
  } catch (error) {
    // 捕获所有异常，确保页面不会崩溃
    console.error('加载员工数据异常:', error)
    employees.value = []
    total.value = 0
    // 不显示错误提示
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadEmployees()
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

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除员工"${row.name}"吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await employeeAPI.delete(row.id)
      if (response && response.code === 200) {
        ElMessage.success('删除成功')
        await loadEmployees()
        // 如果当前页没有数据了，跳转到上一页
        if (employees.value.length === 0 && currentPage.value > 1) {
          currentPage.value--
          await loadEmployees()
        }
      } else {
        ElMessage.error(response?.message || '删除失败')
      }
    } catch (error) {
      console.error('删除员工失败:', error)
      ElMessage.error('删除失败，请检查后端服务')
    }
  }).catch(() => {})
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        let response
        if (isEdit.value) {
          response = await employeeAPI.update(form.value)
          if (response && response.code === 200) {
            ElMessage.success('更新成功')
            await loadEmployees()
          } else {
            ElMessage.error(response?.message || '更新失败')
            return
          }
        } else {
          response = await employeeAPI.add(form.value)
          if (response && response.code === 200) {
            ElMessage.success('添加成功')
            await loadEmployees()
          } else {
            ElMessage.error(response?.message || '添加失败')
            return
          }
        }
        dialogVisible.value = false
        resetForm()
      } catch (error) {
        console.error('保存员工失败:', error)
        ElMessage.error('保存失败，请检查后端服务')
      }
    }
  })
}

const resetForm = () => {
  form.value = {
    employeeId: '',
    name: '',
    gender: '',
    age: null,
    department: '',
    position: '',
    phone: '',
    joinDate: ''
  }
  formRef.value?.clearValidate()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  loadEmployees()
}

const handlePageChange = (val) => {
  currentPage.value = val
  loadEmployees()
}

// 监听搜索文本变化，延迟搜索
let searchTimer = null
watch(searchText, () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    loadEmployees()
  }, 500)
})

onMounted(() => {
  // 确保初始数据正确
  if (!Array.isArray(employees.value)) {
    employees.value = []
  }
  if (typeof total.value !== 'number') {
    total.value = 0
  }
  
  // 尝试加载数据，如果失败也没关系，会显示"暂无数据"
  loadEmployees().catch(err => {
    console.warn('初始化加载数据失败，将显示空列表:', err)
    employees.value = []
    total.value = 0
  })
})
</script>

<style scoped>
.employee-management {
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

.search-bar {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>