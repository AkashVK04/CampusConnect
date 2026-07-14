package com.campusconnect.backend.repository;

import com.campusconnect.backend.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProfileRepository
        extends JpaRepository<StudentProfile, Long> {
}