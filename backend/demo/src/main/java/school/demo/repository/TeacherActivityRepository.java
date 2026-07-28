package school.demo.repository;

import school.demo.model.TeacherActivity;
import school.demo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherActivityRepository extends JpaRepository<TeacherActivity, Long> {
    Page<TeacherActivity> findByTeacher(User teacher, Pageable pageable);
}