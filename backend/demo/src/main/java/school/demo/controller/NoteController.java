package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.model.Note;
import school.demo.model.User;
import school.demo.repository.NoteRepository;
import school.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/teacher/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<?> uploadNote(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("subject") String subject,
            @RequestParam("className") String className,
            @RequestParam(required = false) String description,
            Authentication authentication
    ) {
        try {
            String username = authentication.getName();
            User teacher = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));

            // Create upload directory if not exists
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = Paths.get(uploadDir, uniqueFilename);
            Files.write(filePath, file.getBytes());

            // Create note record
            Note note = new Note();
            note.setTeacher(teacher);
            note.setTitle(title);
            note.setSubject(subject);
            note.setClassName(className);
            note.setDescription(description);
            note.setFileName(originalFilename);
            note.setFilePath("/uploads/" + uniqueFilename);
            note.setFileSize(file.getSize());

            Note saved = noteRepository.save(note);
            return ResponseEntity.ok(new ApiResponse(true, "Note uploaded successfully", saved));

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "File upload failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyNotes(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String username = authentication.getName();
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadedAt").descending());
        Page<Note> notes = noteRepository.findByTeacher(teacher, pageable);

        return ResponseEntity.ok(new ApiResponse(true, "Notes retrieved", notes));
    }

    @GetMapping("/class/{className}")
    public ResponseEntity<?> getNotesByClass(
            @PathVariable String className,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("uploadedAt").descending());
        Page<Note> notes = noteRepository.findByClassName(className, pageable);
        return ResponseEntity.ok(new ApiResponse(true, "Notes retrieved", notes));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        return noteRepository.findById(id)
                .map(note -> {
                    // Delete file
                    try {
                        Path filePath = Paths.get(uploadDir, note.getFilePath().substring(9)); // Remove '/uploads/'
                        Files.deleteIfExists(filePath);
                    } catch (IOException e) {
                        // Log error but continue with database deletion
                    }

                    noteRepository.deleteById(id);
                    return ResponseEntity.ok(new ApiResponse(true, "Note deleted"));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}