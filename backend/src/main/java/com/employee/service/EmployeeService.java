package com.employee.service;

import com.employee.entity.Employee;
import com.employee.mapper.EmployeeMapper;
import com.employee.util.MyBatisUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

/**
 * 员工服务类
 */
public class EmployeeService {

    /**
     * 获取所有员工
     */
    public List<Employee> getAllEmployees() {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            return mapper.selectAll();
        }
    }

    /**
     * 分页查询员工
     */
    public List<Employee> getEmployeesByPage(Integer page, Integer pageSize) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            Integer offset = (page - 1) * pageSize;
            return mapper.selectByPage(offset, pageSize);
        }
    }

    /**
     * 搜索员工
     */
    public List<Employee> searchEmployees(String keyword, Integer page, Integer pageSize) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            Integer offset = (page - 1) * pageSize;
            return mapper.searchEmployees(keyword, offset, pageSize);
        }
    }

    /**
     * 获取员工总数
     */
    public Long getTotalCount() {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            return mapper.countAll();
        }
    }

    /**
     * 获取搜索结果总数
     */
    public Long getSearchCount(String keyword) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            return mapper.countSearch(keyword);
        }
    }

    /**
     * 根据ID获取员工
     */
    public Employee getEmployeeById(Long id) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            return mapper.selectById(id);
        }
    }

    /**
     * 根据工号获取员工
     */
    public Employee getEmployeeByEmployeeId(String employeeId) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession()) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            return mapper.selectByEmployeeId(employeeId);
        }
    }

    /**
     * 添加员工
     */
    public boolean addEmployee(Employee employee) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession(false)) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            int result = mapper.insert(employee);
            sqlSession.commit();
            return result > 0;
        }
    }

    /**
     * 更新员工
     */
    public boolean updateEmployee(Employee employee) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession(false)) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            int result = mapper.update(employee);
            sqlSession.commit();
            return result > 0;
        }
    }

    /**
     * 删除员工
     */
    public boolean deleteEmployee(Long id) {
        try (SqlSession sqlSession = MyBatisUtil.getSqlSession(false)) {
            EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
            int result = mapper.deleteById(id);
            sqlSession.commit();
            return result > 0;
        }
    }
}