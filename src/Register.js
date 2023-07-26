import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { firstName, lastName, email, password };
    await axios.post('http://localhost:8080/api/auth/signup', dataToSubmit);
    alert("Registered successfully!");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email: loginEmail, password: loginPassword };
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', loginData);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      alert("Logged in successfully!");
    } catch (error) {
      alert("Invalid email address or password");
    }
  }

return (
  <div className="register-page">
<h1 className="signup_title">Sign In or Log In to access all the <br /> features Origin Ireland has to offer!</h1>
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>
        <input type="email" placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
    </div>
  </div>
);
};

export default Register;