package com.employee.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * MyBatis工具类
 */
public class MyBatisUtil {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            
            // 加载数据库配置
            Properties props = new Properties();
            InputStream propsStream = Resources.getResourceAsStream("db.properties");
            props.load(propsStream);
            
            // 构建SqlSessionFactory，传入properties
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream, props);

        } catch (IOException e) {
            throw new RuntimeException("初始化MyBatis失败", e);
        }
    }

    public static SqlSession getSqlSession() {
        return sqlSessionFactory.openSession();
    }

    public static SqlSession getSqlSession(boolean autoCommit) {
        return sqlSessionFactory.openSession(autoCommit);
    }
}