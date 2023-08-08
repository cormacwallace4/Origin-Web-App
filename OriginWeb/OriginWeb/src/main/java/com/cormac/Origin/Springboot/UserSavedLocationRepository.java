package com.cormac.Origin.Springboot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserSavedLocationRepository extends JpaRepository<UserSavedLocation, Long> {
    List<UserSavedLocation> findUserSavedLocationsByUserId(Long userId);
}
