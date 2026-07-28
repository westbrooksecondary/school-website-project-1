package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.model.Notice;
import school.demo.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.demo.dto.ApiResponse;
import school.demo.model.Notice;
import school.demo.repository.NoticeRepository;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping("/latest")
    public ResponseEntity<?> getLatestNotices() {
        List<Notice> notices = noticeRepository.findTop5ByOrderByNoticeDateDesc();
        return ResponseEntity.ok(new ApiResponse(true, "Latest notices retrieved", notices));
    }

    @GetMapping
    public ResponseEntity<?> getAllNotices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("noticeDate").descending());
        Page<Notice> notices;

        if (search != null && !search.isEmpty()) {
            notices = noticeRepository.findByTitleContainingOrContentContaining(search, search, pageable);
        } else {
            notices = noticeRepository.findAll(pageable);
        }

        return ResponseEntity.ok(new ApiResponse(true, "Notices retrieved", notices));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoticeById(@PathVariable Long id) {
        return noticeRepository.findById(id)
                .map(notice -> ResponseEntity.ok(new ApiResponse(true, "Notice found", notice)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createNotice(@RequestBody Notice notice) {
        Notice savedNotice = noticeRepository.save(notice);
        return ResponseEntity.ok(new ApiResponse(true, "Notice created successfully", savedNotice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @RequestBody Notice notice) {
        return noticeRepository.findById(id)
                .map(existingNotice -> {
                    notice.setId(id);
                    Notice updatedNotice = noticeRepository.save(notice);
                    return ResponseEntity.ok(new ApiResponse(true, "Notice updated", updatedNotice));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Notice deleted successfully"));
    }
}