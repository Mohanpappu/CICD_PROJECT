import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const [travellers, setTravellers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [currentTraveller, setCurrentTraveller] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    age: "",
    pincode: "",
    state: "",
  });

  const handleAddTraveller = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setCurrentTraveller({
      ...currentTraveller,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = () => {
    setShowReview(true);
  };

  const handleSaveTraveller = () => {
    if (!currentTraveller.firstName || !currentTraveller.gender) {
      alert("Please fill at least first name and gender.");
      return;
    }
    setTravellers([...travellers, currentTraveller]);
    setCurrentTraveller({
      firstName: "",
      lastName: "",
      gender: "",
      mobile: "",
      email: "",
      age: "",
      pincode: "",
      state: "",
    });
    setShowForm(false);
  };

  const handleEdit = () => {
    setShowReview(false);
  };

  // ✅ Navigate to Seat Selection page after confirming
  const handleConfirm = () => {
    navigate("/seats");
  };

  return (
    <div className="booking-page">
      <h2>Trip Details</h2>
      <div className="trip-info">
        <p><strong>From:</strong> Hyderabad</p>
        <p><strong>To:</strong> Delhi</p>
        <p><strong>Date:</strong> 12 Oct 2025</p>
        <p><strong>Price:</strong> ₹8500</p>
      </div>

      <div className="traveller-section">
        <h3>Traveller Details</h3>
        <button className="add-btn" onClick={handleAddTraveller}>
          ➕ Add Traveller
        </button>

        {showForm && (
          <div className="traveller-form">
            <div className="row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={currentTraveller.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={currentTraveller.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={currentTraveller.gender === "Male"}
                  onChange={handleInputChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={currentTraveller.gender === "Female"}
                  onChange={handleInputChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={currentTraveller.gender === "Other"}
                  onChange={handleInputChange}
                />{" "}
                Other
              </label>
            </div>

            <div className="row">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={currentTraveller.age}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={currentTraveller.mobile}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={currentTraveller.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={currentTraveller.pincode}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={currentTraveller.state}
                onChange={handleInputChange}
              />
            </div>

            <button className="save-btn" onClick={handleSaveTraveller}>
              Save Traveller
            </button>
          </div>
        )}

        {travellers.length > 0 && !showReview && (
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        )}

        {showReview && (
          <div className="review-card">
            <h4>Review Your Details</h4>
            <p className="note">
              Please ensure that the spelling of your name and other details
              match with your travel document/govt. ID, as these cannot be
              changed later. Errors might lead to cancellation penalties.
            </p>

            {travellers.map((t, index) => (
              <div key={index} className="review-item">
                <p>
                  <strong>Name:</strong> {t.firstName} {t.lastName}
                </p>
                <p>
                  <strong>Gender:</strong> {t.gender}
                </p>
              </div>
            ))}

            <div className="review-buttons">
              <button className="edit-btn" onClick={handleEdit}>
                ✏ Edit
              </button>
              <button className="confirm-btn" onClick={handleConfirm}>
                ✅ Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;