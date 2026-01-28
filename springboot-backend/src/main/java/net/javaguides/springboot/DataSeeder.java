package net.javaguides.springboot;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data to ensure a fresh start with the new theme
        if (employeeRepository.count() > 0) {
            employeeRepository.deleteAll();
            System.out.println("Cleaned up existing database records.");
        }

        // Add Realistic Demo Data
        List<Employee> employees = Arrays.asList(
                // Leadership & Strategy (Hybrid/Onsite)
                new Employee("Alexander", "Pierce", "alex.pierce@ecopulse.com", "Executive", "HYBRID", 15.5, 3),
                new Employee("Sarah", "Chen", "sarah.chen@ecopulse.com", "Engineering", "REMOTE", 0.0, 0),
                new Employee("Marcus", "Johnson", "m.johnson@ecopulse.com", "Operations", "ONSITE", 12.0, 5),

                // Engineering Team (Mostly Remote/Hybrid)
                new Employee("Emily", "Wong", "emily.wong@ecopulse.com", "Engineering", "HYBRID", 25.0, 2),
                new Employee("David", "Kim", "david.kim@ecopulse.com", "Engineering", "REMOTE", 0.0, 0),
                new Employee("Jessica", "Davis", "j.davis@ecopulse.com", "Engineering", "HYBRID", 8.5, 3),
                new Employee("Raj", "Patel", "raj.patel@ecopulse.com", "DevOps", "REMOTE", 0.0, 0),

                // Sales & Marketing (Varied)
                new Employee("Michael", "Scott", "m.scott@ecopulse.com", "Sales", "ONSITE", 5.0, 5),
                new Employee("Olivia", "Martinez", "o.martinez@ecopulse.com", "Marketing", "HYBRID", 45.0, 1),
                new Employee("Daniel", "Lee", "d.lee@ecopulse.com", "Sales", "HYBRID", 30.0, 2),

                // Support & HR
                new Employee("Sophia", "Brown", "sophia.b@ecopulse.com", "HR", "ONSITE", 10.0, 4),
                new Employee("James", "Wilson", "j.wilson@ecopulse.com", "Customer Success", "REMOTE", 0.0, 0),
                new Employee("Linda", "Taylor", "l.taylor@ecopulse.com", "Customer Success", "HYBRID", 18.0, 3),

                // Facilities
                new Employee("Robert", "Anderson", "r.anderson@ecopulse.com", "Facilities", "ONSITE", 22.5, 5),
                new Employee("Patricia", "Thomas", "p.thomas@ecopulse.com", "Facilities", "ONSITE", 15.0, 5));

        employeeRepository.saveAll(employees);
        System.out.println("Seeded " + employees.size() + " realistic employee profiles into the database.");
    }
}
