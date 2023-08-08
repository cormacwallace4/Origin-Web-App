package com.cormac.Origin.Springboot;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cormac.Origin.Springboot.ResourceNotFoundException;


@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @GetMapping("/")
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

   
    @GetMapping("/{id}")
    public Location getLocation(@PathVariable Long id) {
        return locationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with id " + id));
    }
}

