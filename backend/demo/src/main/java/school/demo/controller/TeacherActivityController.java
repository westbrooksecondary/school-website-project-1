package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.model.TeacherActivity;
import school.demo.model.User;
import school.demo.repository.TeacherActivityRepository;
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
@RequestMapping("/api/teacher/activities")
public class TeacherActivityController {

    @Autowired
    private TeacherActivityRepository activityRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createActivity(@RequestBody TeacherActivity activity, Authentication authentication) {
        String username = authentication.getName();
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        activity.setTeacher(teacher);
        TeacherActivity saved = activityRepository.save(activity);
        return ResponseEntity.ok(new ApiResponse(true, "Activity created", saved));
    }

    @GetMapping
    public ResponseEntity<?> getMyActivities(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String username = authentication.getName();
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("activityDate").descending());
        Page<TeacherActivity> activities = activityRepository.findByTeacher(teacher, pageable);

        return ResponseEntity.ok(new ApiResponse(true, "Activities retrieved", activities));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getActivityById(@PathVariable Long id) {
        return activityRepository.findById(id)
                .map(activity -> ResponseEntity.ok(new ApiResponse(true, "Activity found", activity)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateActivity(@PathVariable Long id, @RequestBody TeacherActivity activity) {
        return activityRepository.findById(id)
                .map(existing -> {
                    activity.setId(id);
                    activity.setTeacher(existing.getTeacher());
                    TeacherActivity updated = activityRepository.save(activity);
                    return ResponseEntity.ok(new ApiResponse(true, "Activity updated", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        activityRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Activity deleted"));
    }
}