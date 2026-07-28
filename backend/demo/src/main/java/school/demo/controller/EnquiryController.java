package school.demo.controller;


import school.demo.dto.ApiResponse;
import school.demo.model.Enquiry;
import school.demo.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.demo.model.Enquiry;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitEnquiry(@RequestBody Enquiry enquiry) {
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return ResponseEntity.ok(new ApiResponse(true, "Enquiry submitted successfully", savedEnquiry));
    }

    @GetMapping
    public ResponseEntity<?> getAllEnquiries(@RequestParam(required = false) String status) {
        List<Enquiry> enquiries;

        if (status != null && !status.isEmpty()) {
            enquiries = enquiryRepository.findByStatus(status);
        } else {
            enquiries = enquiryRepository.findAll();
        }

        return ResponseEntity.ok(new ApiResponse(true, "Enquiries retrieved", enquiries));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateEnquiryStatus(@PathVariable Long id, @RequestParam String status) {
        return enquiryRepository.findById(id)
                .map(enquiry -> {
                    enquiry.setStatus(status);
                    Enquiry updated = enquiryRepository.save(enquiry);
                    return ResponseEntity.ok(new ApiResponse(true, "Status updated", updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}