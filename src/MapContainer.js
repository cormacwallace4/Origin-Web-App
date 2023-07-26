import React, { useCallback, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MapContainer = ({ locations }) => {
  const mapStyles = {        
    height: "67vh",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    border: "4px solid black",
  };

  const defaultCenter = {
    lat: 53.5498,
    lng: -8.100
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDtwzFx_B0tFZx_DJz8LdiytVvlwP7kOjs'
  });

  const mapRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    if (isLoaded) {
      locations.forEach(location => {
        const overlay = new window.google.maps.OverlayView();

        overlay.onAdd = function() {
          let div = document.createElement('div');
          div.style.border = 'none';
          div.style.color = 'RED';
          div.style.padding = '5px 10px';
          div.style.position = 'absolute';
          div.style.textAlign = 'center';
          div.style.whiteSpace = 'nowrap';
          div.style.fontWeight = 'bold'; 
          div.style.textShadow = '1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF';
          div.style.fontSize = '12px';
          div.innerHTML = location.name;

          overlay.getPanes().overlayMouseTarget.appendChild(div);

          overlay.draw = function() {
            var position = overlay.getProjection().fromLatLngToDivPixel(
              new window.google.maps.LatLng(location.latitude, location.longitude));
            div.style.left = position.x - 50 + 'px';
            div.style.top = position.y - 60 + 'px';  //adjust the '30' to move the label up or down
          };
        };

        overlay.setMap(mapRef.current);
      });
    }
  }, [locations, isLoaded]);

  return isLoaded ? (
    <GoogleMap
      id="marker-example"
      mapContainerStyle={mapStyles}
      zoom={7.3}
      center={defaultCenter}
      onLoad={onMapLoad}
      options={{ mapTypeControl: false }}
    >
      {locations.map(item => (
        <Marker 
          key={item.name} 
          position={{ lat: item.latitude, lng: item.longitude }} 
          onClick={() => navigate(`/location-description/${item.id}`)}
        />
      ))}
    </GoogleMap>
  ) : <></>
}

export default MapContainer;
