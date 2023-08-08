package com.cormac.Origin.Springboot;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/saved-reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class SavedReviewController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private SavedReviewRepository savedReviewRepository;

    @GetMapping("/{id}")
    public List<SavedReview> getSavedReviews(@PathVariable Long id) {
        return savedReviewRepository.findByUserId(id);
    }

    @PostMapping
    public String saveReview(@RequestBody Map<String, String> body, @RequestHeader("Authorization") String token) {
        Long locationId = Long.parseLong(body.get("locationId"));
        String reviewText = body.get("reviewText");
        String jwt = token.substring(7);
        DecodedJWT decodedJWT = JWT.decode(jwt);
        Long userId = decodedJWT.getClaim("userId").asLong();

        Optional<User> user = userRepository.findById(userId);
        Optional<Location> location = locationRepository.findById(locationId);

        if (user.isPresent() && location.isPresent()) {
            SavedReview savedReview = new SavedReview();
            savedReview.setUser(user.get());
            savedReview.setLocation(location.get());
            savedReview.setReviewText(reviewText);

            savedReviewRepository.save(savedReview);

            return "Review saved successfully!";
        } else {
            return "User or Location not found!";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        Optional<SavedReview> savedReview = savedReviewRepository.findById(id);

        if (savedReview.isPresent()) {
            savedReviewRepository.delete(savedReview.get());
            return "Review deleted successfully!";
        } else {
            return "Review not found!";
        }
    }
}
