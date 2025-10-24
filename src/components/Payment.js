import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, selectedSeats } = location.state || {};

  // ✅ Always define hooks at the top (before any return)
  const [passengers, setPassengers] = useState(
    selectedSeats ? selectedSeats.map(() => ({ name: "", phone: "", gender: "Male" })) : []
  );

  // ✅ Handle missing state safely (after hooks)
  if (!bus || !selectedSeats) {
    return (
      <div className="payment-error">
        <h2>⚠️ No Booking Data Found</h2>
        <p>Please go back and select your seats again.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const handleChange = (idx, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[idx][field] = value;
    setPassengers(newPassengers);
  };

  const handlePayment = () => {
    for (let p of passengers) {
      if (!p.name || !p.phone) {
        alert("Please fill all passenger details!");
        return;
      }
    }

    alert("✅ Payment Successful!");
    navigate("/ticket", { state: { bus, selectedSeats, passengers } });
  };

  const totalFare = selectedSeats.length * bus.fare;

  return (
    <div className="payment-page">
      <h2>🚌 Payment for {bus.operator}</h2>
      <div className="trip-summary">
        <p>
          <strong>Route:</strong> {bus.from} → {bus.to}
        </p>
        <p>
          <strong>Date:</strong> {bus.date}
        </p>
        <p>
          <strong>Total Fare:</strong> ₹{totalFare}
        </p>
      </div>

      <h3>Passenger Details</h3>
      {passengers.map((p, idx) => (
        <div key={idx} className="passenger-card">
          <h4>Seat {selectedSeats[idx]}</h4>
          <input
            type="text"
            placeholder="Name"
            value={p.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={p.phone}
            onChange={(e) => handleChange(idx, "phone", e.target.value)}
          />
          <select
            value={p.gender}
            onChange={(e) => handleChange(idx, "gender", e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      ))}

      <h3>💳 UPI Payment</h3>
      <p>Scan the QR code below to pay securely via UPI:</p>
      <div className="qr-code">
        <QRCode
          value={`upi://pay?pa=yourupiid@upi&pn=BusBooking&am=${totalFare}&cu=INR`}
        />
      </div>

      <button className="primary-btn" onClick={handlePayment}>
        ✅ Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
