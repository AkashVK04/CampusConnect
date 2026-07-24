package com.campusconnect.backend.controller;

import com.campusconnect.backend.entity.Resume;
import com.campusconnect.backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

private static final String UPLOAD_DIR =
        System.getProperty("user.dir") + File.separator + "uploads";
    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam Long studentId,
            @RequestParam MultipartFile file)
            throws IOException {

        if (!file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }

       File folder = new File(UPLOAD_DIR);

if (!folder.exists()) {
    folder.mkdirs();
}

System.out.println(folder.getAbsolutePath());

        String savedFileName = "resume_" + studentId + ".pdf";
String filePath =
        UPLOAD_DIR + File.separator + savedFileName;
File destination = new File(filePath);

file.transferTo(destination);

System.out.println("Saved to : " + destination.getAbsolutePath());
        Resume resume = resumeRepository.findByStudentId(studentId);

        if (resume == null) {
            resume = new Resume();
            resume.setStudentId(studentId);
        }

        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(filePath);
        resume.setUploadedAt(LocalDateTime.now());

        return resumeRepository.save(resume);
    }

    @GetMapping
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

   @GetMapping("/view/{studentId}")
public ResponseEntity<Resource> viewResume(@PathVariable Long studentId)
        throws IOException {

    Resume resume = resumeRepository.findByStudentId(studentId);

    if (resume == null) {
        return ResponseEntity.notFound().build();
    }

    Path path = Paths.get(resume.getFilePath());

    Resource resource = new UrlResource(path.toUri());

    if (!resource.exists()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
            .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
            .body(resource);
}

@GetMapping("/download/{studentId}")
public ResponseEntity<Resource> downloadResume(@PathVariable Long studentId)
        throws IOException {

    Resume resume = resumeRepository.findByStudentId(studentId);

    if (resume == null) {
        return ResponseEntity.notFound().build();
    }

    Path path = Paths.get(resume.getFilePath());

    Resource resource = new UrlResource(path.toUri());

    if (!resource.exists()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + resume.getFileName() + "\"")
            .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
            .body(resource);
}
}