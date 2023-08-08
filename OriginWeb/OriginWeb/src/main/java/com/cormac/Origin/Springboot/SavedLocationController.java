package com.cormac.Origin.Springboot;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth/saved-locations")
@CrossOrigin(origins = "http://localhost:3000")
public class SavedLocationController {
	
	private static final Logger logger = LoggerFactory.getLogger(SavedLocationController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SavedLocationRepository savedLocationRepository;

    @GetMapping("/{id}/saved-locations")
    public List<SavedLocation> getSavedLocations(@PathVariable Long id) {
        return savedLocationRepository.findByUserId(id);
    }

    @PostMapping
    public String saveLocation(@RequestBody Map<String, String> body, @RequestHeader("Authorization") String token) {
        System.out.println("Received request body: " + body.toString());

        Long locationId = Long.parseLong(body.get("locationId"));
        String locationName = body.get("locationName"); // Extract location name
        String jwt = token.substring(7); // remove 'Bearer ' prefix
        DecodedJWT decodedJWT = JWT.decode(jwt);
        Long userId = decodedJWT.getClaim("userId").asLong();

        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            SavedLocation savedLocation = new SavedLocation();
            savedLocation.setUser(user.get());
            savedLocation.setLocationId(locationId);
            savedLocation.setLocationName(locationName); // Set location name

            SavedLocation saved = savedLocationRepository.save(savedLocation);

            logger.info(saved.toString());
            System.out.println(saved.toString());

            return "Location saved successfully!";
        } else {
            return "User not found!";
        }
    }


    @DeleteMapping("/users/{userId}/saved-locations/{savedLocationId}")
    public String deleteLocation(@PathVariable Long userId, @PathVariable Long savedLocationId) {
      Optional<SavedLocation> savedLocation = savedLocationRepository.findById(savedLocationId);
      
      if (savedLocation.isPresent() && savedLocation.get().getUser().getId().equals(userId)) {
        savedLocationRepository.delete(savedLocation.get());
        return "Location deleted successfully!";
      } else {
        return "Location not found!";
      }
    }


}
