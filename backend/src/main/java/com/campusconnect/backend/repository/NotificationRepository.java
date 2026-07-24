package com.campusconnect.backend.repository;

import com.campusconnect.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {
}