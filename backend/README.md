# 员工管理系统后端

基于 MyBatis + Servlet + MySQL + Maven 的 RESTful API 后端服务

## 技术栈

- **Java**: JDK 1.8+
- **框架**: MyBatis 3.5.13
- **Web**: Servlet 4.0
- **数据库**: MySQL 8.0+
- **构建工具**: Maven
- **JSON处理**: Jackson 2.15.2

## 项目结构

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/employee/
│   │   │       ├── entity/          # 实体类
│   │   │       ├── mapper/          # Mapper接口
│   │   │       ├── service/         # 服务层
│   │   │       ├── servlet/         # Servlet控制器
│   │   │       ├── filter/          # 过滤器
│   │   │       └── util/            # 工具类
│   │   ├── resources/
│   │   │   ├── mapper/              # MyBatis XML映射文件
│   │   │   ├── db/                  # 数据库脚本
│   │   │   ├── mybatis-config.xml   # MyBatis配置文件
│   │   │   └── db.properties        # 数据库连接配置
│   │   └── webapp/
│   │       └── WEB-INF/
│   │           └── web.xml          # Web应用配置
└── pom.xml                          # Maven配置
```

## 数据库配置

1. 修改 `src/main/resources/db.properties` 中的数据库连接信息：

```properties
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/employee_management?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
db.username=root
db.password=your_password
```

2. 执行 `src/main/resources/db/schema.sql` 创建数据库和表

## 编译和部署

### 使用Maven编译

```bash
cd backend
mvn clean package
```

编译后的 war 文件在 `target/employee-management-system.war`

### 部署到Tomcat

1. 将 war 文件复制到 Tomcat 的 `webapps` 目录
2. 启动 Tomcat
3. 访问 `http://localhost:8080/employee-management-system`

## API接口

### 员工管理接口

基础路径: `/api/employee`

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/employee?page=1&pageSize=10&keyword=关键词` | 分页查询员工列表（支持搜索） |
| GET | `/api/employee/{id}` | 根据ID查询员工 |
| POST | `/api/employee` | 添加员工 |
| PUT | `/api/employee` | 更新员工 |
| DELETE | `/api/employee/{id}` | 删除员工 |

### 请求示例

**添加员工**
```json
POST /api/employee
Content-Type: application/json

{
  "employeeId": "EMP001",
  "name": "张三",
  "gender": "男",
  "age": 28,
  "department": "技术部",
  "position": "高级工程师",
  "phone": "13800138001",
  "joinDate": "2020-01-15"
}
```

**更新员工**
```json
PUT /api/employee
Content-Type: application/json

{
  "id": 1,
  "employeeId": "EMP001",
  "name": "张三",
  "gender": "男",
  "age": 29,
  "department": "技术部",
  "position": "高级工程师",
  "phone": "13800138001",
  "joinDate": "2020-01-15"
}
```

### 响应格式

```json
{
  "code": 200,
  "message": "操作成功",
  "data": [...],
  "total": 100
}
```

## 开发环境要求

- JDK 1.8 或更高版本
- Maven 3.6+
- MySQL 8.0+
- Tomcat 9.0+ 或其他 Servlet 容器

## 注意事项

1. 确保 MySQL 服务已启动
2. 确保数据库连接配置正确
3. 前端请求地址需要在 `src/utils/api.js` 中配置正确的后端地址
4. 后端已配置 CORS，支持跨域请求