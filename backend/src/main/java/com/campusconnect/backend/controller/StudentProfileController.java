package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.StudentProfile;
import com.campusconnect.backend.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @GetMapping("/student/email/{email}")
    public StudentProfile getByEmail(
            @PathVariable String email) {

        return studentProfileRepository.findByEmail(email);
    }
    @GetMapping("/student/profiles")
public List<StudentProfile> getProfiles() {
    return studentProfileRepository.findAll();
}
}