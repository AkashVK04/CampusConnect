package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.PlacementDrive;
import com.campusconnect.backend.repository.PlacementDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PlacementDriveController {

    @Autowired
    private PlacementDriveRepository repository;

    // GET ALL DRIVES
    @GetMapping("/drives")
    public List<PlacementDrive> getAllDrives() {
        return repository.findAll();
    }

    // GET SINGLE DRIVE
    @GetMapping("/drives/{id}")
    public PlacementDrive getDriveById(
            @PathVariable Long id) {

        return repository.findById(id)
                .orElse(null);
    }

    // CREATE DRIVE
    @PostMapping("/drive")
    public PlacementDrive addDrive(
            @RequestBody PlacementDrive drive) {

        return repository.save(drive);
    }

    // UPDATE DRIVE
    @PutMapping("/drives/{id}")
    public PlacementDrive updateDrive(
            @PathVariable Long id,
            @RequestBody PlacementDrive updatedDrive) {

        PlacementDrive drive =
                repository.findById(id)
                        .orElse(null);

        if (drive == null) {
            return null;
        }

        drive.setCompanyName(
                updatedDrive.getCompanyName());

        drive.setRole(
                updatedDrive.getRole());

        drive.setLocation(
                updatedDrive.getLocation());

        drive.setDriveDate(
                updatedDrive.getDriveDate());

        drive.setStatus(
                updatedDrive.getStatus());

        return repository.save(drive);
    }

    // DELETE DRIVE
    @DeleteMapping("/drives/{id}")
    public String deleteDrive(
            @PathVariable Long id) {

        repository.deleteById(id);

        return "Drive Deleted Successfully";
    }
}