package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.model.Admission;
import school.demo.repository.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {

    @Autowired
    private AdmissionRepository admissionRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> submitAdmission(@RequestBody Admission admission) {
        Admission savedAdmission = admissionRepository.save(admission);
        return ResponseEntity.ok(new ApiResponse(true, "Admission application submitted successfully", savedAdmission));
    }

    @GetMapping
    public ResponseEntity<?> getAllAdmissions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("appliedDate").descending());
        Page<Admission> admissions;

        if (status != null && !status.isEmpty()) {
            admissions = admissionRepository.findByStatus(status, pageable);
        } else {
            admissions = admissionRepository.findAll(pageable);
        }

        return ResponseEntity.ok(new ApiResponse(true, "Admissions retrieved", (Admission) admissions));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAdmissionById(@PathVariable Long id) {
        return admissionRepository.findById(id)
                .map(admission -> ResponseEntity.ok(new ApiResponse(true, "Admission found", admission)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAdmissionStatus(@PathVariable Long id, @RequestParam String status) {
        return admissionRepository.findById(id)
                .map(admission -> {
                    admission.setStatus(status);
                    Admission updated = admissionRepository.save(admission);
                    return ResponseEntity.ok(new ApiResponse(true, "Status updated", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}