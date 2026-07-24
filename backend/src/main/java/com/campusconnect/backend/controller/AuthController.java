package com.campusconnect.backend.controller;

import com.campusconnect.backend.dto.RegisterRequest;
import com.campusconnect.backend.entity.Role;
import com.campusconnect.backend.entity.User;
import com.campusconnect.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.campusconnect.backend.dto.LoginRequest;
import com.campusconnect.backend.dto.LoginResponse;
import com.campusconnect.backend.security.JwtUtil;

import java.time.LocalDateTime;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
private JwtUtil jwtUtil;

   @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return new LoginResponse(
                "User not found",
                null,
                null,
                null
        );
    }

    if (!user.getPassword().equals(request.getPassword())) {
        return new LoginResponse(
                "Invalid password",
                null,
                null,
                null
        );
    }

    String token = jwtUtil.generateToken(user.getEmail());

    return new LoginResponse(
            "Login Successful",
            token,
            user.getRole().name(),
            user.getEmail()
    );
}
    

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

    

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.ROLE_STUDENT);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return "User Registered Successfully";

        
    }
}