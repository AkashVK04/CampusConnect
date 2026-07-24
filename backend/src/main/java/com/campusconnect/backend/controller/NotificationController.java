package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Notification;
import com.campusconnect.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping("/notification")
    public Notification addNotification(
            @RequestBody Notification notification) {

        return notificationRepository.save(notification);
    }

    @GetMapping("/notifications")
    public List<Notification> getNotifications() {

        return notificationRepository.findAll();
    }

    @DeleteMapping("/notification/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationRepository.deleteById(id);

        return "Notification Deleted";
    }
}