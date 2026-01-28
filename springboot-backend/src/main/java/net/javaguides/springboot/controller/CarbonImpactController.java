package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.service.CarbonCalculationService;
import net.javaguides.springboot.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/carbon")
public class CarbonImpactController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CarbonCalculationService carbonService;

    @GetMapping("/dashboard")
    public Map<String, Object> getCarbonDashboardData() {
        List<Employee> employees = employeeService.getAllEmployees();

        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalEmissions", carbonService.calculateTotalEmission(employees));
        dashboardData.put("departmentEmissions", carbonService.calculateDepartmentalEmissions(employees));
        dashboardData.put("employeeCount", employees.size());

        return dashboardData;
    }

    @PostMapping("/simulate")
    public Map<String, Object> simulatePolicy(@RequestBody Map<String, Integer> params) {
        int maxOnsiteDays = params.getOrDefault("maxOnsiteDays", 5);
        List<Employee> employees = employeeService.getAllEmployees();

        Map<String, Object> result = new HashMap<>();

        double currentTotal = carbonService.calculateTotalEmission(employees);
        double simulatedTotal = carbonService.calculateSimulatedTotal(employees, maxOnsiteDays);

        result.put("currentTotal", currentTotal);
        result.put("simulatedTotal", simulatedTotal);
        result.put("reduction", currentTotal - simulatedTotal);
        result.put("reductionPercentage",
                currentTotal > 0 ? ((currentTotal - simulatedTotal) / currentTotal) * 100 : 0);

        return result;
    }
}
