package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Application;
import com.campusconnect.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @PostMapping("/applications")
    public Application apply(@RequestBody Application application) {

        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }

    @GetMapping("/applications")
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
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
}