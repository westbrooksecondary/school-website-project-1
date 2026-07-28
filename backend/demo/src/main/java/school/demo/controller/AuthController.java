package school.demo.controller;

import school.demo.dto.ApiResponse;
import school.demo.dto.LoginRequest;
import school.demo.dto.LoginResponse;
import school.demo.model.User;
import school.demo.repository.UserRepository;
import school.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import school.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            System.out.println("Password match: " + passwordEncoder.matches("teacher123", user.getPassword()));

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

            LoginResponse response = new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getFullName()
            );

            return ResponseEntity.ok(new ApiResponse(true, "Login successful", response));

        } catch (Exception e) {
            e.printStackTrace(); // 🔥 SHOW REAL ERROR IN CONSOLE

            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage())); // 🔥 show real message
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
//            );
//
//            User user = userRepository.findByUsername(request.getUsername())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
//
//            LoginResponse response = new LoginResponse(
//                    token,
//                    user.getUsername(),
//                    user.getEmail(),
//                    user.getRole(),
//                    user.getFullName()
//            );
//
//            return ResponseEntity.ok(new ApiResponse(true, "Login successful", response));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid credentials"));
//        }
//    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (userRepository.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Username already exists"));
            }

            if (userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Email already exists"));
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);

            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully", savedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Registration failed: " + e.getMessage()));
        }
    }
}