package com.cormac.Origin.Springboot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedReviewRepository extends JpaRepository<SavedReview, Long> {
    List<SavedReview> findByUserId(Long userId);
}
