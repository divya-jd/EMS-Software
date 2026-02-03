package com.jd.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.jd.model.Employee;

public interface EmployeeService {
    List<Employee> getAllEmployees();

    Employee createEmployee(Employee employee);

    ResponseEntity<Employee> getEmployeeById(Long id);

    ResponseEntity<Employee> updateEmployee(Long id, Employee employeeDetails);

    ResponseEntity<Map<String, Boolean>> deleteEmployee(Long id);
}
