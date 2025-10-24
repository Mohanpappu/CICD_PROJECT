import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login successful (mock)");

    // ✅ Navigate to Travel page
    navigate("/travel");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="close-btn" onClick={() => navigate("/")}>
          &times;
        </button>

        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <button className="btn btn-link mt-2" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <p className="signup-text">
          New user? <a href="/signup">Create your account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
