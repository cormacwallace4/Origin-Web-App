import React from 'react';

const LocationList = ({ locations }) => {
  return (
    <div>
      <h1>Historical Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
            <p>{location.latitude + ", " + location.longitude}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;

