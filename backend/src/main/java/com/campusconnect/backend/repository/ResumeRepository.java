package com.campusconnect.backend.repository;

import com.campusconnect.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Resume findByStudentId(Long studentId);

}       