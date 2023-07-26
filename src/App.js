import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationDescription from './LocationDescription'; 
import SavedLocations from './SavedLocations';
import WriteReview from './WriteReview';
import MyReviews from './MyReviews';

import MapContainer from './MapContainer';
import Title from './title';
import Navbar from './Navbar';
import Register from './Register'; 
import Trivia from './Trivia';
import './App.css';
import Header from './Header';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/locations/')
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<><Title /><MapContainer locations={locations} /></>} />
            <Route path="/register" element={<Register />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/write-review" element={<WriteReview locations={locations} />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="/location-description/:id" element={<LocationDescription />} />
            <Route path="/savedLocations" element={<SavedLocations />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

