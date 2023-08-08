package com.cormac.Origin.Springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth/user-saved-locations")
@CrossOrigin(origins = "http://localhost:3000")
public class UserSavedLocationController {

    @Autowired
    private UserSavedLocationRepository userSavedLocationRepository;

    @GetMapping("/users/{id}")
    public List<UserSavedLocation> getSavedLocationsForUser(@PathVariable Long id) {
        return userSavedLocationRepository.findUserSavedLocationsByUserId(id);
    }
}
