package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.model.Homework;
import school.demo.model.User;
import school.demo.repository.HomeworkRepository;
import school.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher/homework")
public class HomeworkController {

    @Autowired
    private HomeworkRepository homeworkRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createHomework(@RequestBody Homework homework, Authentication authentication) {
        String username = authentication.getName();
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        homework.setTeacher(teacher);
        Homework saved = homeworkRepository.save(homework);
        return ResponseEntity.ok(new ApiResponse(true, "Homework created", saved));
    }

    @GetMapping
    public ResponseEntity<?> getMyHomework(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String username = authentication.getName();
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("assignedDate").descending());
        Page<Homework> homework = homeworkRepository.findByTeacher(teacher, pageable);

        return ResponseEntity.ok(new ApiResponse(true, "Homework retrieved", homework));
    }

    @GetMapping("/class/{className}")
    public ResponseEntity<?> getHomeworkByClass(
            @PathVariable String className,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("assignedDate").descending());
        Page<Homework> homework = homeworkRepository.findByClassName(className, pageable);
        return ResponseEntity.ok(new ApiResponse(true, "Homework retrieved", homework));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateHomework(@PathVariable Long id, @RequestBody Homework homework) {
        return homeworkRepository.findById(id)
                .map(existing -> {
                    homework.setId(id);
                    homework.setTeacher(existing.getTeacher());
                    Homework updated = homeworkRepository.save(homework);
                    return ResponseEntity.ok(new ApiResponse(true, "Homework updated", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHomework(@PathVariable Long id) {
        homeworkRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Homework deleted"));
    }
}