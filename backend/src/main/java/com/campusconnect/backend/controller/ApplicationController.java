package com.campusconnect.backend.controller;

import com.campusconnect.backend.dto.ApplicationDTO;
import com.campusconnect.backend.entity.Application;
import com.campusconnect.backend.entity.Company;
import com.campusconnect.backend.entity.StudentProfile;
import com.campusconnect.backend.repository.ApplicationRepository;
import com.campusconnect.backend.repository.CompanyRepository;
import com.campusconnect.backend.repository.StudentProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentProfileRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/applications")
    public Application apply(@RequestBody Application application) {
        StudentProfile student =
        studentRepository.findById(application.getStudentId())
                .orElseThrow();

Company company =
        companyRepository.findById(application.getCompanyId())
                .orElseThrow();

if (student.getCgpa() < company.getMinCgpa()) {
    throw new RuntimeException(
            "Not Eligible. Minimum CGPA required is "
                    + company.getMinCgpa()
    );
}

        List<Application> existingApplications =
                applicationRepository.findByStudentIdAndCompanyId(
                        application.getStudentId(),
                        application.getCompanyId()
                );

        System.out.println(
                "MATCHING APPLICATIONS = "
                        + existingApplications.size()
        );

        if (!existingApplications.isEmpty()) {
            throw new RuntimeException(
                    "You have already applied for this company"
            );
        }

        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }


    @GetMapping("/applications")
    public List<ApplicationDTO> getAllApplications() {

        List<Application> applications =
                applicationRepository.findAll();

        return applications.stream().map(app -> {

            ApplicationDTO dto = new ApplicationDTO();

            dto.setId(app.getId());
            dto.setStudentId(app.getStudentId());
            dto.setCompanyId(app.getCompanyId());

            dto.setStatus(app.getStatus());
            dto.setRemarks(app.getRemarks());

            StudentProfile student = null;

            if (app.getStudentId() != null) {
                student = studentRepository
                        .findById(app.getStudentId())
                        .orElse(null);
            }

            if (student != null) {
                dto.setStudentName(student.getName());
                dto.setUsn(student.getUsn());
                dto.setEmail(student.getEmail());
            }

            Company company = null;

            if (app.getCompanyId() != null) {
                company = companyRepository
                        .findById(app.getCompanyId())
                        .orElse(null);
            }

            if (company != null) {
                dto.setCompanyName(company.getCompanyName());
                dto.setJobRole(company.getJobRole());
            } else {
                dto.setCompanyName("Deleted Company");
                dto.setJobRole("-");
            }

            return dto;

        }).toList();
    }

    @GetMapping("/applications/{id}")
    public Application getApplication(@PathVariable Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @PutMapping("/applications/{id}/status")
    public Application updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Application application =
                applicationRepository.findById(id).orElse(null);

        if (application == null) {
            return null;
        }

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    @PutMapping("/applications/{id}/shortlist")
    public Application shortlist(@PathVariable Long id) {

        Application app =
                applicationRepository.findById(id).orElseThrow();

        app.setStatus("SHORTLISTED");

        return applicationRepository.save(app);
    }

    @PutMapping("/applications/{id}/reject")
    public Application reject(@PathVariable Long id) {

        Application app =
                applicationRepository.findById(id).orElseThrow();

        app.setStatus("REJECTED");

        return applicationRepository.save(app);
    }

    @GetMapping("/applications/company/{companyId}")
    public List<Application> getCompanyApplicants(
            @PathVariable Long companyId) {

        return applicationRepository.findByCompanyId(companyId);
    }
}