// API请求工具类 - 使用axios
import axios from 'axios'

// API基础URL配置
// 开发环境使用代理，生产环境直接调用后端
const API_BASE_URL = import.meta.env.PROD 
  ? 'http://localhost:8080/employee_management_system_war/api'
  : '/api'  // 开发环境通过vite代理转发

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 请求前可以添加token等
    console.log('API请求:', config.method?.toUpperCase(), config.url, config.params || config.data)
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    // 直接返回响应数据
    const data = response.data
    console.log('API响应:', response.config.url, data)
    
    // 如果后端返回的数据格式是 {code, message, data}，直接返回
    if (data && typeof data === 'object' && 'code' in data) {
      return data
    }
    
    // 如果后端直接返回数组或其他格式，包装成统一格式
    return {
      code: 200,
      message: '操作成功',
      data: data,
      total: Array.isArray(data) ? data.length : undefined
    }
  },
  error => {
    console.error('API响应错误:', error)
    
    // 处理HTTP错误
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response
      return {
        code: status,
        message: data?.message || `HTTP错误: ${status}`,
        data: null
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return {
        code: 500,
        message: '网络请求失败，请检查后端服务是否启动',
        data: null
      }
    } else {
      // 请求配置错误
      return {
        code: 500,
        message: error.message || '请求配置错误',
        data: null
      }
    }
  }
)

/**
 * 员工管理API
 */
export const employeeAPI = {
  // 获取员工列表（支持分页和搜索）
  getList(params = {}) {
    const { keyword, page = 1, pageSize = 10 } = params
    const queryParams = {
      page,
      pageSize
    }
    if (keyword) {
      queryParams.keyword = keyword
    }
    
    return apiClient.get('/employee', { params: queryParams })
      .then(response => {
        // 响应拦截器已经处理了数据格式，这里直接返回
        return response
      })
      .catch(error => {
        // 错误已经在拦截器中处理，这里返回错误对象
        return error
      })
  },

  // 根据ID获取员工
  getById(id) {
    return apiClient.get(`/employee/${id}`)
      .then(response => response)
      .catch(error => error)
  },

  // 添加员工
  add(employee) {
    return apiClient.post('/employee', employee)
      .then(response => response)
      .catch(error => error)
  },

  // 更新员工
  update(employee) {
    return apiClient.put('/employee', employee)
      .then(response => response)
      .catch(error => error)
  },

  // 删除员工
  delete(id) {
    return apiClient.delete(`/employee/${id}`)
      .then(response => response)
      .catch(error => error)
  }
}

export default apiClient