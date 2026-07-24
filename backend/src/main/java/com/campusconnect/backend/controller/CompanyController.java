package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Company;
import com.campusconnect.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/company")
    public Company addCompany(@RequestBody Company company) {
        return companyRepository.save(company);
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @PutMapping("/company/{id}")
public Company updateCompany(
        @PathVariable Long id,
        @RequestBody Company updatedCompany) {

    Company company =
            companyRepository.findById(id).orElse(null);

    if (company == null) {
        return null;
    }

    company.setCompanyName(updatedCompany.getCompanyName());
    company.setJobRole(updatedCompany.getJobRole());
    company.setPackageLpa(updatedCompany.getPackageLpa());
    company.setMinCgpa(updatedCompany.getMinCgpa());

    return companyRepository.save(company);
}

    @DeleteMapping("/company/{id}")
    public String deleteCompany(@PathVariable Long id) {

        companyRepository.deleteById(id);

        return "Company Deleted Successfully";
    }
}