# Axios迁移说明

## 已完成的修改

### 1. 安装axios
axios已经添加到 `package.json` 依赖中。

### 2. 重构API工具类 (`src/utils/api.js`)
- 使用axios替代fetch
- 配置了axios实例和拦截器
- 添加了请求/响应日志
- 统一错误处理

### 3. API配置
- **开发环境**: 通过Vite代理转发到后端 (`/api` → `http://localhost:8080/employee_management_system_war/api`)
- **生产环境**: 直接调用后端API (`http://localhost:8080/employee_management_system_war/api`)

### 4. 后端CORS配置
- 添加了CORS过滤器 (`CorsFilter.java`)
- 配置在 `web.xml` 中启用

## 使用说明

### 1. 安装依赖
```bash
npm install
```

### 2. 开发环境
```bash
npm run dev
```
- 前端运行在 `http://localhost:3000`
- API请求会自动代理到后端

### 3. 生产环境
```bash
npm run build
```
- 构建后的文件在 `dist` 目录
- 需要配置web服务器代理API请求，或直接使用绝对URL

## API使用示例

```javascript
import { employeeAPI } from '@/utils/api'

// 获取员工列表
const response = await employeeAPI.getList({ page: 1, pageSize: 10, keyword: '张三' })
if (response.code === 200) {
  console.log(response.data)  // 员工列表
  console.log(response.total) // 总数
}

// 添加员工
const result = await employeeAPI.add({
  employeeId: 'EMP001',
  name: '张三',
  // ...其他字段
})

// 更新员工
const result = await employeeAPI.update({
  id: 1,
  name: '李四',
  // ...其他字段
})

// 删除员工
const result = await employeeAPI.delete(1)
```

## 响应格式

所有API响应都遵循统一格式：
```json
{
  "code": 200,
  "message": "操作成功",
  "data": [...],
  "total": 100
}
```

## 错误处理

- 网络错误：返回 `{ code: 500, message: "网络请求失败..." }`
- HTTP错误：返回 `{ code: status, message: "错误信息" }`
- 业务错误：返回后端返回的错误信息

## 排查问题

如果前端接收不到数据，检查以下几点：

1. **检查浏览器控制台**
   - 查看Network标签，确认请求是否发送
   - 查看请求URL是否正确
   - 查看响应内容

2. **检查后端**
   - 确认后端服务已启动
   - 直接访问 `http://localhost:8080/employee_management_system_war/api/employee?page=1&pageSize=10`
   - 确认返回的数据格式正确

3. **检查CORS**
   - 查看浏览器控制台是否有CORS错误
   - 确认后端CORS过滤器已配置

4. **检查代理配置**
   - 开发环境：确认 `vite.config.js` 中的代理配置正确
   - 生产环境：确认API_BASE_URL配置正确

## 常见问题

### Q: 请求返回404
A: 检查API路径是否正确，确认war包名称是 `employee_management_system_war`

### Q: CORS错误
A: 确认后端CORS过滤器已正确配置并部署

### Q: 数据格式不正确
A: 检查后端返回的数据格式，确认是否包含 `code`, `data`, `total` 字段