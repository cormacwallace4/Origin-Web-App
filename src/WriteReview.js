import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '20px',
  height: '700px',
  width: '900px'
};

const selectStyle = {
  width: '30%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  marginBottom: '20px',
  height: '30px',
  fontSize: '16px'
};

const textareaStyle = {
  ...selectStyle,
  height: '200px',
  width: '800px',
  fontSize: '18px',
  border: '1px solid black',
};

const buttonStyle = {
  cursor: 'pointer',
  padding: '2px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007BFF',
  color: '#fff',
  marginTop: '0px',
  marginBottom: '5px',
  height: '30px',
  width: '150px'
};

function WriteReview({locations}) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!selectedLocation || !review) {
      alert("Please select a location and write a review before submitting.");
      return;
    }

    let locationName = locations.find(location => location.id == selectedLocation)?.name;

    if(!locationName) {
      alert("Invalid location selected.");
      return;
    }
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    let newReview = {location: locationName, review: review};
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    console.log("Saved Review:", newReview);
    navigate('/myreviews');
  };

  return (
    <div>
      <h1>Write a Review</h1>

      <div style={formStyle}> 
      <h3>Review a recent visit to a historical location. Select a location below and write about your experience at that location. You can then save your review for viewing later.</h3>
        <select style={selectStyle} onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
          <option value="">Select a location</option>
          {locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
        </select>
        <textarea style={textareaStyle} onChange={(e) => setReview(e.target.value)} value={review}></textarea>
        <button style={buttonStyle} onClick={handleSubmit}>Save Review</button>
        <button style={buttonStyle} onClick={() => navigate('/myreviews')}>My Reviews</button>
      </div>
    </div>
  );
}

export default WriteReview;

