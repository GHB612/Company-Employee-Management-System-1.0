package com.employee.mapper;

import com.employee.entity.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 员工Mapper接口
 */
public interface EmployeeMapper {
    /**
     * 查询所有员工
     */
    List<Employee> selectAll();

    /**
     * 根据ID查询员工
     */
    Employee selectById(Long id);

    /**
     * 根据工号查询员工
     */
    Employee selectByEmployeeId(String employeeId);

    /**
     * 分页查询员工
     */
    List<Employee> selectByPage(@Param("offset") Integer offset, @Param("limit") Integer limit);

    /**
     * 搜索员工（姓名、工号、部门）
     */
    List<Employee> searchEmployees(@Param("keyword") String keyword, 
                                    @Param("offset") Integer offset, 
                                    @Param("limit") Integer limit);

    /**
     * 统计员工总数
     */
    Long countAll();

    /**
     * 统计搜索结果总数
     */
    Long countSearch(@Param("keyword") String keyword);

    /**
     * 插入员工
     */
    int insert(Employee employee);

    /**
     * 更新员工
     */
    int update(Employee employee);

    /**
     * 根据ID删除员工
     */
    int deleteById(Long id);
}