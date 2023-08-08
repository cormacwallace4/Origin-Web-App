package com.cormac.Origin.Springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import javax.sql.DataSource;
import java.sql.SQLException;

@SpringBootApplication
@ComponentScan(basePackages = "com.cormac.Origin.Springboot")
public class Application {

    @Autowired
    private DataSource dataSource;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @jakarta.annotation.PostConstruct
    public void printDatabaseConnection() throws SQLException {
        System.out.println("DB Connection: " + dataSource.getConnection().getMetaData().getURL());
    }
}
