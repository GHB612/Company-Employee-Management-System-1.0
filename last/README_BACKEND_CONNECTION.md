# 前后端连接说明

## 配置说明

### 1. 后端配置

1. **数据库配置**
   - 修改 `backend/src/main/resources/db.properties` 中的数据库连接信息
   - 执行 `backend/src/main/resources/db/schema.sql` 创建数据库和表

2. **编译后端**
   ```bash
   cd backend
   mvn clean package
   ```

3. **部署后端**
   - 将生成的 `target/employee-management-system.war` 部署到Tomcat
   - 启动Tomcat，访问地址：`http://localhost:8080/employee-management-system`

### 2. 前端配置

1. **API配置**
   - 开发环境：前端通过 Vite 代理转发请求到后端
   - 生产环境：直接调用后端API地址

2. **启动前端**
   ```bash
   npm run dev
   ```

### 3. 代理配置

前端 `vite.config.js` 已配置代理：
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/employee-management-system/api')
  }
}
```

这意味着：
- 前端请求 `/api/employee` 
- 会被代理转发到 `http://localhost:8080/employee-management-system/api/employee`

### 4. API接口

- `GET /api/employee?page=1&pageSize=10&keyword=关键词` - 分页查询员工
- `POST /api/employee` - 添加员工
- `PUT /api/employee` - 更新员工
- `DELETE /api/employee/{id}` - 删除员工

### 5. 故障排查

如果前端无法显示数据：

1. **检查后端是否启动**
   - 确认Tomcat已启动
   - 访问 `http://localhost:8080/employee-management-system/api/employee?page=1&pageSize=10` 应该返回JSON数据

2. **检查数据库连接**
   - 确认MySQL服务已启动
   - 确认数据库连接配置正确
   - 确认已创建数据库和表

3. **检查CORS设置**
   - 后端已配置CORS，允许跨域请求

4. **检查浏览器控制台**
   - 查看是否有网络错误
   - 查看API请求是否正确

5. **检查代理配置**
   - 确认 `vite.config.js` 中的代理配置正确
   - 重启前端开发服务器

### 6. 测试步骤

1. 启动MySQL数据库
2. 执行数据库脚本创建表
3. 编译并部署后端到Tomcat
4. 启动前端开发服务器
5. 访问 `http://localhost:3000`
6. 检查员工管理页面是否正常显示数据