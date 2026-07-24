package com.campusconnect.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @GetMapping("/api/student/profile")
    public String profile() {
        return "Welcome to Student Profile";
    }
}