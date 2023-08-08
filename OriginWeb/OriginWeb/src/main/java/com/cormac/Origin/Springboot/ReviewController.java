package com.cormac.Origin.Springboot;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/{id}/reviews")
    public List<Review> getReviews(@PathVariable Long id) {
        return reviewRepository.findByUserId(id);
    }

    @PostMapping
    public String saveReview(@RequestBody Map<String, String> body) {
        Long locationId = Long.parseLong(body.get("locationId"));
        String reviewText = body.get("reviewText");
        Long userId = Long.parseLong(body.get("userId"));

        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            Review review = new Review();
            review.setUser(user.get());
            review.setLocationId(locationId);
            review.setReviewText(reviewText);

            Review saved = reviewRepository.save(review);

            return "Review saved successfully!";
        } else {
            return "User not found!";
        }
    }


    @DeleteMapping("/users/{userId}/reviews/{reviewId}")
    public String deleteReview(@PathVariable Long userId, @PathVariable Long reviewId) {
        Optional<Review> review = reviewRepository.findByIdAndUserId(reviewId, userId);

        if (review.isPresent()) {
            reviewRepository.delete(review.get());
            return "Review deleted successfully!";
        } else {
            return "Review not found!";
        }
    }
}
