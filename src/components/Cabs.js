import React, { useState } from "react";
import "./Cabs.css";

const Cabs = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    passengers: 1,
    cabType: "Sedan",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Searching ${formData.cabType} from ${formData.pickup} to ${formData.drop} on ${formData.date} at ${formData.time} for ${formData.passengers} passenger(s).`
    );
  };

  return (
    <div className="cabs-section">
      {/* Search Box */}
      <div className="cab-search">
        <h2>🚖 Book Your Cab</h2>
        <form onSubmit={handleSubmit} className="cab-form">
          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            value={formData.pickup}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="drop"
            placeholder="Drop Location"
            value={formData.drop}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="passengers"
            min="1"
            max="6"
            value={formData.passengers}
            onChange={handleChange}
          />
          <select
            name="cabType"
            value={formData.cabType}
            onChange={handleChange}
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
          </select>
          <button type="submit" className="search-btn">
            🔍 Search Cabs
          </button>
        </form>
      </div>

      {/* Offers */}
      <div className="cab-offers">
        <h3>🔥 Exclusive Cab Offers</h3>
        <div className="offer-cards">
          <div className="offer-card">🚖 Flat ₹100 Off on First Cab Booking</div>
          <div className="offer-card">🎉 25% Off on Airport Rides</div>
          <div className="offer-card">💳 Extra 10% Off with HDFC Cards</div>
          <div className="offer-card">⚡ Instant Cashback on UPI Payments</div>
        </div>
      </div>

      {/* Why Book With Us */}
      <div className="cab-why">
        <h3>Why Book Cabs With Us?</h3>
        <ul>
          <li>🚗 10,000+ Verified Drivers</li>
          <li>🛡️ Safe & Sanitized Rides</li>
          <li>💰 Affordable Pricing</li>
          <li>⏱️ On-Time Pickup Guarantee</li>
          <li>📞 24/7 Customer Support</li>
        </ul>
      </div>

      {/* Popular Routes */}
      <div className="cab-routes">
        <h3>Popular Cab Routes</h3>
        <div className="route-list">
          <span>Mumbai ⇆ Pune</span>
          <span>Bangalore ⇆ Mysore</span>
          <span>Delhi ⇆ Agra</span>
          <span>Hyderabad ⇆ Vijayawada</span>
          <span>Chennai ⇆ Pondicherry</span>
        </div>
      </div>
    </div>
  );
};

export default Cabs;
