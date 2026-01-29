package com.jd.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email_id")
	private String emailId;

	@Column(name = "department")
	private String department;

	@Column(name = "work_mode")
	private String workMode; // REMOTE, HYBRID, ONSITE

	@Column(name = "commute_distance")
	private Double commuteDistance; // km

	@Column(name = "weekly_onsite_days")
	private Integer weeklyOnsiteDays;

	public Employee() {

	}

	public Employee(String firstName, String lastName, String emailId, String department, String workMode,
			Double commuteDistance, Integer weeklyOnsiteDays) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.department = department;
		this.workMode = workMode;
		this.commuteDistance = commuteDistance;
		this.weeklyOnsiteDays = weeklyOnsiteDays;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getWorkMode() {
		return workMode;
	}

	public void setWorkMode(String workMode) {
		this.workMode = workMode;
	}

	public Double getCommuteDistance() {
		return commuteDistance;
	}

	public void setCommuteDistance(Double commuteDistance) {
		this.commuteDistance = commuteDistance;
	}

	public Integer getWeeklyOnsiteDays() {
		return weeklyOnsiteDays;
	}

	public void setWeeklyOnsiteDays(Integer weeklyOnsiteDays) {
		this.weeklyOnsiteDays = weeklyOnsiteDays;
	}
}
