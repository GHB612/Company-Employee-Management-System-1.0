# 故障排查指南

## 问题1: 前端显示空白

### 可能原因和解决方案

1. **后端未启动**
   - 前端代码已经优化，即使后端未启动也能显示空白表格
   - 检查浏览器控制台是否有错误
   - 打开开发者工具 (F12) 查看 Network 标签，检查API请求是否失败

2. **Vue路由问题**
   - 确保访问的是 `http://localhost:3000` 或正确的路由
   - 检查浏览器控制台是否有Vue相关的错误

3. **依赖未安装**
   ```bash
   npm install
   ```

## 问题2: EmployeeServlet.java 编译错误

### 可能原因和解决方案

1. **Maven依赖未下载**
   ```bash
   cd backend
   mvn clean install
   ```

2. **JDK版本不匹配**
   - 确保使用 JDK 1.8 或更高版本
   - 检查 IDE 的 JDK 配置

3. **IDE配置问题**
   - 在IDE中刷新Maven项目
   - 重新导入Maven项目
   - 检查项目结构是否正确

4. **具体错误信息**
   - 查看IDE的具体错误信息
   - 常见错误：
     - 缺少依赖：运行 `mvn dependency:resolve`
     - 导入错误：检查包名是否正确
     - 方法不存在：检查相关类是否正确编译

### 编译后端项目

```bash
cd backend
mvn clean compile
```

如果编译成功，应该能看到 "BUILD SUCCESS"

如果编译失败，查看具体的错误信息：
- `[ERROR]` 开头的行会显示具体错误
- 常见错误：缺少依赖、语法错误、类找不到等

### 检查依赖

```bash
cd backend
mvn dependency:tree
```

这会显示所有依赖关系，确保依赖都已下载。

## 问题3: API请求失败

### 检查步骤

1. **检查后端是否启动**
   - 访问 `http://localhost:8080/employee-management-system/api/employee?page=1&pageSize=10`
   - 应该返回JSON格式的数据

2. **检查数据库连接**
   - 确认MySQL服务已启动
   - 确认数据库连接配置正确（`backend/src/main/resources/db.properties`）
   - 确认已创建数据库和表（执行 `schema.sql`）

3. **检查代理配置**
   - 前端使用Vite代理转发请求
   - 确认 `vite.config.js` 中的代理配置正确
   - 重启前端开发服务器

## 快速测试

### 1. 测试后端API（不使用前端）

使用浏览器或curl测试：
```bash
curl http://localhost:8080/employee-management-system/api/employee?page=1&pageSize=10
```

应该返回JSON数据。

### 2. 测试前端

```bash
npm run dev
```

打开浏览器控制台，查看：
- Network标签：检查API请求是否发送
- Console标签：查看是否有JavaScript错误

### 3. 完整测试流程

1. 启动MySQL
2. 执行数据库脚本
3. 编译后端：`cd backend && mvn clean package`
4. 部署到Tomcat
5. 启动Tomcat
6. 启动前端：`npm run dev`
7. 访问前端页面

## 常见错误代码

### 后端错误

- `ClassNotFoundException`: 缺少依赖，运行 `mvn dependency:resolve`
- `SQLException`: 数据库连接失败，检查数据库配置
- `IOException`: MyBatis配置文件路径错误

### 前端错误

- `Failed to fetch`: 后端未启动或代理配置错误
- `404 Not Found`: API路径错误
- `500 Internal Server Error`: 后端服务器错误，查看后端日志

## 获取帮助

如果以上方法都无法解决问题：

1. 查看浏览器控制台的完整错误信息
2. 查看后端Tomcat日志
3. 检查Maven编译输出
4. 确认所有依赖都已正确安装