package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.StudentProfile;
import com.campusconnect.backend.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentProfileController {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @PostMapping("/profile")
    public StudentProfile createProfile(
            @RequestBody StudentProfile profile) {

        return studentProfileRepository.save(profile);
    }

    @GetMapping("/profiles")
    public List<StudentProfile> getAllProfiles() {

        return studentProfileRepository.findAll();
    }

    @GetMapping("/profile/{id}")
    public StudentProfile getProfileById(
            @PathVariable Long id) {

        return studentProfileRepository.findById(id)
                .orElse(null);
    }
}