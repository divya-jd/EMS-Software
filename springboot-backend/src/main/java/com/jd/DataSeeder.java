package com.jd;

import com.jd.model.Employee;
import com.jd.model.Role;
import com.jd.model.User;
import com.jd.repository.EmployeeRepository;
import com.jd.repository.RoleRepository;
import com.jd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        if (employeeRepository.count() > 0) {
            employeeRepository.deleteAll();
        }
        if (userRepository.count() > 0) {
            userRepository.deleteAll();
        }
        if (roleRepository.count() > 0) {
            roleRepository.deleteAll();
        }

        // Seed Roles
        Role adminRole = new Role("ROLE_ADMIN");
        Role auditorRole = new Role("ROLE_AUDITOR");
        List<Role> savedRoles = roleRepository.saveAll(Arrays.asList(adminRole, auditorRole));
        adminRole = savedRoles.get(0);
        auditorRole = savedRoles.get(1);

        // Seed Users
        User admin = new User();
        admin.setName("Admin User");
        admin.setUsername("admin");
        admin.setEmail("admin@ecopulse.com");
        admin.setPassword(passwordEncoder.encode("admin"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        admin.setRoles(adminRoles);

        User auditor = new User();
        auditor.setName("Auditor User");
        auditor.setUsername("auditor");
        auditor.setEmail("auditor@ecopulse.com");
        auditor.setPassword(passwordEncoder.encode("auditor"));
        Set<Role> auditorRoles = new HashSet<>();
        auditorRoles.add(auditorRole);
        auditor.setRoles(auditorRoles);

        userRepository.saveAll(Arrays.asList(admin, auditor));

        // Seed Employees (Realistic Data)
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
                new Employee("Linda", "Taylor", "l.taylor@ecopulse.com", "Customer Success", "HYBRID", 18.0, 3));

        employeeRepository.saveAll(employees);
        System.out.println("Seeded Roles, Users, and Employee profiles.");
    }
}
