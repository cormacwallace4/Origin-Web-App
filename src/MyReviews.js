import React, { useState, useEffect } from 'react';

const ulStyle = {
  listStyleType: 'none',
  padding: '30px',
};

const liStyle = {
  border: '1px solid black',
  borderRadius: '15px',
  padding: '20px',
  margin: '10px 0',
  width: '800px',  
  maxWidth: '100%', 
  overflowWrap: 'break-word',
  marginBottom: '30px'
};



const buttonStyle = {
  cursor: 'pointer',
  padding: '5px 3px',
  width: '80px',
  borderRadius: '15px',
  backgroundColor: '#dc3545',
  fontSize: '14px',
  color: '#fff',
  float: 'right'
};

function MyReviews() {
  const [reviews, setReviews] = useState([]);

  // Fetch the reviews from local storage when the component mounts
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleDelete = (index) => {
  const newReviews = [...reviews];
  newReviews.splice(index, 1);
  setReviews(newReviews);
  localStorage.setItem('reviews', JSON.stringify(newReviews));
};

  return (
    <div>
      <h1>My Reviews</h1>
      {reviews.length === 0 && <p>You have not written any reviews yet.</p>}
      <ul style={ulStyle}>
        {reviews.map((review, index) => (
          <li style={liStyle} key={index}>
            <h2>{review.location}</h2>
            <p>{review.review}</p>
            <button1 style={buttonStyle} onClick={() => handleDelete(index)}>Delete</button1>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReviews;

