import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LocationDescription() {
  const { id } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [fontSize, setFontSize] = useState(20); // Initial font size
  const [lineHeight, setLineHeight] = useState(1.7); // Initial line height
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/locations/${id}`)
      .then(response => {
        setLocationData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);

  if (!locationData) return 'Loading...';

  const handleGetDirections = () => {
    const { latitude, longitude } = locationData;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleFontSizeChange = e => {
    setFontSize(parseInt(e.target.value));
  };

  const handleLineHeightChange = e => {
    setLineHeight(parseFloat(e.target.value));
  };

  const handleSaveLocation = () => {
    let savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];

    // Check if the location is already saved
    if(savedLocations.some(savedLocation => savedLocation.id === locationData.id)) {
        // Location is already saved, show a message
        alert('Location already saved!');
    } else {
        // Save the location to local storage
        savedLocations.push(locationData);
        localStorage.setItem('savedLocations', JSON.stringify(savedLocations));

        // Show a message
        alert('Location Saved!');
    }
};


  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{locationData.name}</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ marginRight: '20px' }}>
          <div
            style={{
              width: '700px',
              height: '700px',
              border: '2px solid black',
              overflow: 'auto',
              borderRadius: '15px',
              padding: '10px',
              marginBottom: '30px',
              marginTop: '30px',
            }}
          >
            <h2 style={{ paddingTop: '20px' }}>Description</h2>
            <div
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
              }}
            >
              <label htmlFor="fontSize">Font Size:</label>
              <input
                type="number"
                id="fontSize"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
              <label htmlFor="lineHeight" style={{ marginLeft: '10px' }}>
                Line Height:
              </label>
              <input
                type="number"
                id="lineHeight"
                step="0.1"
                min="1"
                value={lineHeight}
                onChange={handleLineHeightChange}
                style={{ marginLeft: '5px' }}
              />
              <p>{locationData.description}</p>
            </div>
          </div>
          <Link 
          className="button-with-border"
          style={{
                width: '150px',
                height: '30px',
                marginTop: '45px',
                marginBottom: '0px',
                backgroundColor: 'red',
                padding: '7px 15px',
                fontSize: '15px',
                color: 'white',
                borderRadius: '15px',
                marginRight: '0px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'red';
              e.target.style.borderColor = 'red';

            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'red';
              e.target.style.color = 'white';
              e.target.style.borderColor = 'white';
            }}
          to="/">Back to map</Link>
        </div>
        <div>
        <style>
          {`
            .button-with-border {
              border: 2px solid white;
            }
          `}
        </style>
        <div
          style={{
            width: '700px',
            height: '500px',
            display: 'flex',
            borderRadius: '15px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'hidden',
            marginBottom: '0px',
            marginTop: '30px',
          }}
        >
          <img
            src={locationData.photoUrl}
            alt={locationData.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          style={{
            width: '700px',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <button
    className="button-with-border"
    style={{
      width: '150px',
      height: '30px',
      fontSize: '15px',
      backgroundColor: 'rgb(25, 140, 45)',
      padding: '4px 5px',
      color: 'white',
      borderRadius: '15px',
      marginRight: '0px',
      marginTop: '20px',
      cursor: 'pointer',
    }}
    onClick={handleGetDirections}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'rgb(25, 140, 45)';
      e.target.style.borderColor = 'rgb(25, 140, 45)';

    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgb(25, 140, 45)';
      e.target.style.color = 'white';
      e.target.style.borderColor = 'white';
    }}
  >
    Get Directions
  </button>
  <button
    className="button-with-border"
    onClick={handleSaveLocation}
    style={{
      width: '150px',
      height: '30px',
      marginTop: '45px',
      marginBottom: '0px',
      backgroundColor: 'rgb(0, 102, 255)',
      padding: '4px 5px',
      fontSize: '15px',
      color: 'white',
      borderRadius: '15px',
      marginRight: '0px',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'rgb(0, 102, 255)';
      e.target.style.borderColor = 'rgb(0, 102, 255)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgb(0, 102, 255)';
      e.target.style.color = 'white';
      e.target.style.borderColor = 'white';
    }}
  >
    Save Location
  </button>
  <button
    className="button-with-border"
    style={{
      width: '150px',
      height: '30px',
      backgroundColor: 'rgb(100, 22, 246)',
      padding: '4px 5px',
      color: 'white',
      borderRadius: '15px',
      fontSize: '15px',
      marginRight: '0px',
      marginTop: '1px',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'rgb(100, 22, 246)';
      e.target.style.borderColor = 'rgb(100, 22, 246)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'rgb(109, 22, 246)';
      e.target.style.color = 'white';
      e.target.style.borderColor = 'white';
    }}
  >
    Start Virtual Tour
  </button>
        </div>

                </div>
              </div>
            </div>
          );
        }

        export default LocationDescription;