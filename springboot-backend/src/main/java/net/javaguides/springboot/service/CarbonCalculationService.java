package net.javaguides.springboot.service;

import net.javaguides.springboot.model.Employee;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CarbonCalculationService {

    // Constants
    private static final double CAR_EMISSION_FACTOR_KG_PER_KM = 0.12;
    private static final double OFFICE_ENERGY_EMISSION_KG_PER_DAY = 2.5; // Average office energy impact per person per
                                                                         // day
    private static final int WEEKS_PER_YEAR = 52;

    public double calculateEmployeeAnnualEmission(Employee employee) {
        double commuteEmission = 0.0;
        double officeEmission = 0.0;

        // Commute Emission: Distance * 2 (Round Trip) * Onsite Days * Weeks * Factor
        if (employee.getCommuteDistance() != null && employee.getWeeklyOnsiteDays() != null) {
            commuteEmission = employee.getCommuteDistance() * 2 * employee.getWeeklyOnsiteDays() * WEEKS_PER_YEAR
                    * CAR_EMISSION_FACTOR_KG_PER_KM;
        }

        // Office Energy Emission: Onsite Days * Weeks * Factor
        if (employee.getWeeklyOnsiteDays() != null) {
            officeEmission = employee.getWeeklyOnsiteDays() * WEEKS_PER_YEAR * OFFICE_ENERGY_EMISSION_KG_PER_DAY;
        }

        return commuteEmission + officeEmission;
    }

    public Map<String, Double> calculateDepartmentalEmissions(List<Employee> employees) {
        return employees.stream()
                .filter(e -> e.getDepartment() != null)
                .collect(Collectors.groupingBy(
                        Employee::getDepartment,
                        Collectors.summingDouble(this::calculateEmployeeAnnualEmission)));
    }

    public double calculateTotalEmission(List<Employee> employees) {
        return employees.stream()
                .mapToDouble(this::calculateEmployeeAnnualEmission)
                .sum();
    }

    public double calculateSimulatedTotal(List<Employee> employees, int maxOnsiteDays) {
        return employees.stream()
                .mapToDouble(e -> {
                    // Clone or use temporary logic
                    int originalDays = e.getWeeklyOnsiteDays() != null ? e.getWeeklyOnsiteDays() : 0;
                    int simulatedDays = Math.min(originalDays, maxOnsiteDays);

                    double commute = 0.0;
                    if (e.getCommuteDistance() != null) {
                        commute = e.getCommuteDistance() * 2 * simulatedDays * WEEKS_PER_YEAR
                                * CAR_EMISSION_FACTOR_KG_PER_KM;
                    }
                    double office = simulatedDays * WEEKS_PER_YEAR * OFFICE_ENERGY_EMISSION_KG_PER_DAY;

                    return commute + office;
                })
                .sum();
    }
}
