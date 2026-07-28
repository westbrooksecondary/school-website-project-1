package school.demo.config;

import school.demo.model.Faculty;
import school.demo.model.Notice;
import school.demo.model.User;
import school.demo.repository.FacultyRepository;
import school.demo.repository.NoticeRepository;
import school.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@modernintercollege.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setFullName("Admin User");
            userRepository.save(admin);
            System.out.println("Admin user created: username=admin, password=admin123");
        }

        // Create sample teacher
        if (!userRepository.existsByUsername("teacher1")) {
            User teacher = new User();
            teacher.setUsername("teacher1");
            teacher.setEmail("teacher@modernintercollege.com");
            teacher.setPassword(passwordEncoder.encode("teacher123"));
            teacher.setRole("TEACHER");
            teacher.setFullName("Rajesh Kumar");
            userRepository.save(teacher);
            System.out.println("Teacher user created: username=teacher1, password=teacher123");
        }

        // Create sample notices
        if (noticeRepository.count() == 0) {
            Notice notice1 = new Notice();
            notice1.setTitle("Annual Examination 2024-25");
            notice1.setContent("The annual examination for all classes will commence from 15th March 2025. Students are advised to prepare accordingly.");
            notice1.setNoticeDate(LocalDate.now());
            notice1.setPriority("HIGH");
            notice1.setCategory("EXAM");
            noticeRepository.save(notice1);

            Notice notice2 = new Notice();
            notice2.setTitle("Holiday Notice - Holi");
            notice2.setContent("The school will remain closed on account of Holi festival from 14th March to 16th March 2025.");
            notice2.setNoticeDate(LocalDate.now().minusDays(1));
            notice2.setPriority("MEDIUM");
            notice2.setCategory("HOLIDAY");
            noticeRepository.save(notice2);

            Notice notice3 = new Notice();
            notice3.setTitle("Sports Day Event");
            notice3.setContent("Annual Sports Day will be organized on 25th March 2025. All students must participate.");
            notice3.setNoticeDate(LocalDate.now().minusDays(2));
            notice3.setPriority("MEDIUM");
            notice3.setCategory("EVENT");
            noticeRepository.save(notice3);

            System.out.println("Sample notices created");
        }

        // Create sample faculty
        if (facultyRepository.count() == 0) {
            Faculty faculty1 = new Faculty();
            faculty1.setName("Dr. Rajesh Kumar");
            faculty1.setSubject("Mathematics");
            faculty1.setQualification("M.Sc, Ph.D in Mathematics");
            faculty1.setExperience("15 years");
            faculty1.setEmail("rajesh.kumar@modernintercollege.com");
            faculty1.setPhone("+91-9876543210");
            faculty1.setPhotoUrl("https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg");
            faculty1.setBio("Experienced Mathematics teacher with a passion for making complex concepts simple.");
            facultyRepository.save(faculty1);

            Faculty faculty2 = new Faculty();
            faculty2.setName("Mrs. Priya Sharma");
            faculty2.setSubject("English");
            faculty2.setQualification("M.A in English Literature");
            faculty2.setExperience("10 years");
            faculty2.setEmail("priya.sharma@modernintercollege.com");
            faculty2.setPhone("+91-9876543211");
            faculty2.setPhotoUrl("https://images.unsplash.com/photo-1622460241924-a114e6abe1ff");
            faculty2.setBio("Dedicated English teacher focused on developing communication skills.");
            facultyRepository.save(faculty2);

            Faculty faculty3 = new Faculty();
            faculty3.setName("Mr. Amit Verma");
            faculty3.setSubject("Science");
            faculty3.setQualification("M.Sc in Physics");
            faculty3.setExperience("12 years");
            faculty3.setEmail("amit.verma@modernintercollege.com");
            faculty3.setPhone("+91-9876543212");
            faculty3.setPhotoUrl("https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg");
            faculty3.setBio("Science educator with hands-on teaching approach.");
            facultyRepository.save(faculty3);

            Faculty faculty4 = new Faculty();
            faculty4.setName("Mrs. Sunita Singh");
            faculty4.setSubject("Hindi");
            faculty4.setQualification("M.A in Hindi");
            faculty4.setExperience("8 years");
            faculty4.setEmail("sunita.singh@modernintercollege.com");
            faculty4.setPhone("+91-9876543213");
            faculty4.setPhotoUrl("https://images.unsplash.com/photo-1622460241924-a114e6abe1ff");
            faculty4.setBio("Passionate Hindi teacher promoting linguistic excellence.");
            facultyRepository.save(faculty4);

            System.out.println("Sample faculty created");
        }
    }
}