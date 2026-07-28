package school.demo.repository;

import school.demo.model.Homework;
import school.demo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {
    Page<Homework> findByTeacher(User teacher, Pageable pageable);
    Page<Homework> findByClassName(String className, Pageable pageable);
}