import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate hook

  const flights = [
    {
      id: 1,
      airline: "Air India",
      departure: "10:30 AM",
      arrival: "2:00 PM",
      duration: "3h 30m",
      price: 8500,
    },
    {
      id: 2,
      airline: "IndiGo",
      departure: "1:15 PM",
      arrival: "4:45 PM",
      duration: "3h 30m",
      price: 7800,
    },
    {
      id: 3,
      airline: "Vistara",
      departure: "6:00 PM",
      arrival: "9:30 PM",
      duration: "3h 30m",
      price: 9200,
    },
    {
      id: 4,
      airline: "SpiceJet",
      departure: "8:00 AM",
      arrival: "11:25 AM",
      duration: "3h 25m",
      price: 7600,
    },
    {
      id: 5,
      airline: "Go First",
      departure: "9:45 PM",
      arrival: "1:15 AM",
      duration: "3h 30m",
      price: 8100,
    },
  ];

  return (
    <div className="search-results">
      <h2>Available Flights</h2>
      <p>Select a flight that suits your schedule and budget</p>

      <div className="flights-list">
        {flights.map((f) => (
          <div key={f.id} className="flight-card">
            <div className="flight-info">
              <h3>{f.airline}</h3>
              <p>Departure: {f.departure}</p>
              <p>Arrival: {f.arrival}</p>
              <p>Duration: {f.duration}</p>
            </div>

            <div className="flight-price">
              <p>Price: ₹{f.price}</p>
              <button onClick={() => navigate("/booking")}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;