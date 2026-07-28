package school.demo.repository;

import school.demo.model.Note;
import school.demo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    Page<Note> findByTeacher(User teacher, Pageable pageable);
    Page<Note> findByClassName(String className, Pageable pageable);
}
