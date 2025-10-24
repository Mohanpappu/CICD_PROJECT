import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectSeats.css";

const SelectSeats = () => {
  const { state } = useLocation();
  const { bus, form } = state;
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length >= 6) { alert("Max 6 seats per booking"); return; }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="seat-page">
      <h2>Select Seats for {bus.operator}</h2>
      <div className="seats-grid">
        {bus.seats.map((seat) => (
          <button
            key={seat}
            className={selectedSeats.includes(seat) ? "seat selected" : "seat"}
            onClick={() => toggleSeat(seat)}
          >{seat}</button>
        ))}
      </div>
      <button className="primary-btn" onClick={() => navigate("/payment", { state: { bus, form, selectedSeats } })}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default SelectSeats;
