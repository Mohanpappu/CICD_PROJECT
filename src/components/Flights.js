import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Flights.css";

const Flights = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState("1 Traveller");
  const [classType, setClassType] = useState("Economy");

  const handleSearch = () => {
    if (!from || !destination || !date) {
      alert("Please fill all required fields!");
      return;
    }

    navigate("/search", {
      state: { from, destination, date, travellers, classType },
    });
  };

  return (
    <div className="flights-section">
      <div className="flight-search-box">
        <h2 className="section-title">Book Your Flight</h2>

        <div className="search-fields">
          <div className="row">
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="">From (India)</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Kolkata</option>
              <option>Hyderabad</option>
            </select>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Destination Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>United Arab Emirates</option>
              <option>Singapore</option>
              <option>Germany</option>
              <option>France</option>
              <option>Australia</option>
              <option>Canada</option>
              <option>Thailand</option>
              <option>Malaysia</option>
              <option>Qatar</option>
              <option>Saudi Arabia</option>
              <option>Japan</option>
              <option>South Korea</option>
              <option>Italy</option>
              <option>Switzerland</option>
              <option>Turkey</option>
              <option>Oman</option>
              <option>Vietnam</option>
              <option>Indonesia</option>
            </select>
          </div>

          <div className="row">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
            >
              <option>1 Traveller</option>
              <option>2 Travellers</option>
              <option>3 Travellers</option>
              <option>4 Travellers</option>
            </select>
          </div>

          <div className="row single">
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            🔍 Search Flights
          </button>
        </div>
      </div>

      <div className="offers-section">
        <h2 className="offers-title">✨ Offers for You</h2>
        <div className="offers-container">
          <div className="offer-card">
            <img src="/images/image5.jpg" alt="Offer 1" />
            <h3>Let's Travel – 50% Off on All Flights</h3>
            <button className="offer-btn">Get Offer</button>
          </div>

          <div className="offer-card">
            <img src="/images/image6.jpg" alt="Offer 2" />
            <h3>Travel Sale – Save 50% Today!</h3>
            <button className="offer-btn">Get Offer</button>
          </div>

          <div className="offer-card">
            <img src="/images/image7.jpg" alt="Offer 3" />
            <h3>Super Sale – Fly More, Pay Less!</h3>
            <button className="offer-btn">Get Offer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
