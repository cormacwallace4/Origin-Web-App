package com.cormac.Origin.Springboot;

import java.util.Optional;
import java.util.*;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
   @Autowired
   private JwtUtil jwtUtil;
   
   private final UserRepository userRepository;

   // using constructor injection to auto wire
   public UserController(UserRepository userRepository) {
       this.userRepository = userRepository;
   }

   @PostMapping("/signup")
   public ResponseEntity<?> registerUser(@RequestBody User user) {
      if(userRepository.existsByEmail(user.getEmail())) {
         return ResponseEntity
                 .badRequest()
                 .body("Error: Email is already in use!");
      }

      // Creating user's account
      User newUser = new User();

      newUser.setFirstName(user.getFirstName());
      newUser.setLastName(user.getLastName());
      newUser.setEmail(user.getEmail());
      newUser.setPassword(user.getPassword());

      userRepository.save(newUser);

      return ResponseEntity.ok("You have registered successfully, please log in to your account.");
   }
   
   @PostMapping("/signin")
   public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
       Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
       if (user.isPresent()) {
           if (user.get().getPassword().equals(loginRequest.getPassword())) {
               // pass in the user object to the generateToken method
               String token = jwtUtil.generateToken(user.get());
               return ResponseEntity.ok(new AuthenticationResponse(token, user.get().getId(), "You have successfully logged in."));
           } else {
               return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email address or password.");
           }
       } else {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email address or password.");
       }
   }

}
