package com.employee.servlet;

import com.employee.entity.Employee;
import com.employee.service.EmployeeService;
import com.employee.util.ResponseResult;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * 员工管理Servlet
 */
@WebServlet("/api/employee/*")
public class EmployeeServlet extends HttpServlet {
    private EmployeeService employeeService = new EmployeeService();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        // 允许跨域
        setCorsHeaders(response);

        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();

        try {
            // 如果pathInfo为null或空，或者只有"/"，则查询列表
            if (pathInfo == null || pathInfo.equals("/") || pathInfo.equals("")) {
                // 查询所有员工或分页查询
                handleList(request, response, out);
            } else if (pathInfo.startsWith("/") && pathInfo.length() > 1) {
                // 有路径信息，尝试解析ID
                String idStr = pathInfo.substring(1);
                if (idStr != null && idStr.matches("\\d+")) {
                    // 根据ID查询
                    Long id = Long.parseLong(idStr);
                    Employee employee = employeeService.getEmployeeById(id);
                    if (employee != null) {
                        out.print(objectMapper.writeValueAsString(ResponseResult.success(employee)));
                    } else {
                        out.print(objectMapper.writeValueAsString(ResponseResult.error("员工不存在")));
                    }
                } else {
                    out.print(objectMapper.writeValueAsString(ResponseResult.error("无效的ID")));
                }
            } else {
                // 其他情况也按列表查询处理
                handleList(request, response, out);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(objectMapper.writeValueAsString(ResponseResult.error("服务器错误：" + e.getMessage())));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        setCorsHeaders(response);

        PrintWriter out = response.getWriter();

        try {
            // 读取请求体
            BufferedReader reader = request.getReader();
            StringBuilder json = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                json.append(line);
            }

            Employee employee = objectMapper.readValue(json.toString(), Employee.class);

            // 检查工号是否已存在
            Employee existing = employeeService.getEmployeeByEmployeeId(employee.getEmployeeId());
            if (existing != null) {
                out.print(objectMapper.writeValueAsString(ResponseResult.error("该工号已存在")));
                return;
            }

            boolean success = employeeService.addEmployee(employee);
            if (success) {
                out.print(objectMapper.writeValueAsString(ResponseResult.success("添加成功", (Object) null)));
            } else {
                out.print(objectMapper.writeValueAsString(ResponseResult.error("添加失败")));
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print(objectMapper.writeValueAsString(ResponseResult.error("服务器错误：" + e.getMessage())));
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        setCorsHeaders(response);

        PrintWriter out = response.getWriter();

        try {
            // 读取请求体
            BufferedReader reader = request.getReader();
            StringBuilder json = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                json.append(line);
            }

            Employee employee = objectMapper.readValue(json.toString(), Employee.class);

            boolean success = employeeService.updateEmployee(employee);
            if (success) {
                out.print(objectMapper.writeValueAsString(ResponseResult.success("更新成功", (Object) null)));
            } else {
                out.print(objectMapper.writeValueAsString(ResponseResult.error("更新失败")));
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print(objectMapper.writeValueAsString(ResponseResult.error("服务器错误：" + e.getMessage())));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        setCorsHeaders(response);

        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();

        try {
            if (pathInfo != null && pathInfo.startsWith("/")) {
                String idStr = pathInfo.substring(1);
                if (idStr.matches("\\d+")) {
                    Long id = Long.parseLong(idStr);
                    boolean success = employeeService.deleteEmployee(id);
                    if (success) {
                        out.print(objectMapper.writeValueAsString(ResponseResult.success("删除成功", (Object) null)));
                    } else {
                        out.print(objectMapper.writeValueAsString(ResponseResult.error("删除失败")));
                    }
                } else {
                    out.print(objectMapper.writeValueAsString(ResponseResult.error("无效的ID")));
                }
            } else {
                out.print(objectMapper.writeValueAsString(ResponseResult.error("无效的请求路径")));
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print(objectMapper.writeValueAsString(ResponseResult.error("服务器错误：" + e.getMessage())));
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    /**
     * 处理列表查询
     */
    private void handleList(HttpServletRequest request, HttpServletResponse response, PrintWriter out)
            throws Exception {
        String keyword = request.getParameter("keyword");
        String pageStr = request.getParameter("page");
        String pageSizeStr = request.getParameter("pageSize");

        Integer page = pageStr != null ? Integer.parseInt(pageStr) : 1;
        Integer pageSize = pageSizeStr != null ? Integer.parseInt(pageSizeStr) : 10;

        List<Employee> employees;
        Long total;

        if (keyword != null && !keyword.trim().isEmpty()) {
            // 搜索
            employees = employeeService.searchEmployees(keyword.trim(), page, pageSize);
            total = employeeService.getSearchCount(keyword.trim());
        } else {
            // 分页查询
            employees = employeeService.getEmployeesByPage(page, pageSize);
            total = employeeService.getTotalCount();
        }

        out.print(objectMapper.writeValueAsString(ResponseResult.success(employees, total)));
    }

    /**
     * 设置CORS响应头
     */
    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Max-Age", "3600");
    }
}