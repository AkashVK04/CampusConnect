package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Company;
import com.campusconnect.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
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
}