package school.demo.controller;


import school.demo.dto.ApiResponse;
import school.demo.model.Faculty;
import school.demo.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyRepository facultyRepository;

    @GetMapping
    public ResponseEntity<?> getAllFaculty() {
        List<Faculty> faculty = facultyRepository.findAll();
        return ResponseEntity.ok(new ApiResponse(true, "Faculty retrieved", faculty));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFacultyById(@PathVariable Long id) {
        return facultyRepository.findById(id)
                .map(faculty -> ResponseEntity.ok(new ApiResponse(true, "Faculty found", faculty)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createFaculty(@RequestBody Faculty faculty) {
        Faculty saved = facultyRepository.save(faculty);
        return ResponseEntity.ok(new ApiResponse(true, "Faculty created", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        return facultyRepository.findById(id)
                .map(existing -> {
                    faculty.setId(id);
                    Faculty updated = facultyRepository.save(faculty);
                    return ResponseEntity.ok(new ApiResponse(true, "Faculty updated", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFaculty(@PathVariable Long id) {
        facultyRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Faculty deleted"));
    }
}