import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SavedLocations.css'; // Assuming you have created a CSS file for styling

function SavedLocations() {
  const [savedLocations, setSavedLocations] = useState([]);
  const navigate = useNavigate();

  // Load the saved locations from local storage when the component mounts
  useEffect(() => {
    const storedLocations = localStorage.getItem('savedLocations');
    if (storedLocations) {
      setSavedLocations(JSON.parse(storedLocations));
    }
  }, []);

  // Navigate to the detailed view of the clicked location
  const handleLocationClick = (locationId) => {
    navigate(`/location-description/${locationId}`);
  };

  // Handle location delete
  const handleLocationDelete = (locationId) => {
    const newSavedLocations = savedLocations.filter(location => location.id !== locationId);
    setSavedLocations(newSavedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(newSavedLocations));
  };

  return (
    <div className="containerSL">
  <div className="SLtitle">Saved Locations</div>
  <ul className="location-list">
        {savedLocations.map((location, index) => (
          <li key={index} className="location-item" onClick={() => handleLocationClick(location.id)}>
            <span className="location-name">{location.name}</span>
            <div className="location-actions">
              <Link to={`/location-description/${location.id}`} className="location-link">
                View
              </Link>
              <buttonDelete onClick={(e) => {e.stopPropagation(); handleLocationDelete(location.id);}} className="location-delete">
                Delete
              </buttonDelete>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedLocations;

