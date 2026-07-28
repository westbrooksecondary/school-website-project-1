package school.demo.repository;

import school.demo.model.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findTop5ByOrderByNoticeDateDesc();
    Page<Notice> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);
    List<Notice> findByCategory(String category);
}