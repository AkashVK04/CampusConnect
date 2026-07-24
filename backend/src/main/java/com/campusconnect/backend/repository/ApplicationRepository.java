package com.campusconnect.backend.repository;

import com.campusconnect.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByCompanyId(Long companyId);

    List<Application> findByStudentIdAndCompanyId(
            Long studentId,
            Long companyId
    );
}