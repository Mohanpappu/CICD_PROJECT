import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigate = useNavigate();

  // ✅ Generate seat layout (10 rows, 6 columns: A–F)
  const rows = 10;
  const cols = ["A", "B", "C", "D", "E", "F"];

  // ✅ Randomly mark some seats as occupied
  const occupiedSeats = ["1B", "2D", "3F", "4A", "6C", "7E", "9B", "10F"];

  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return; // can't select occupied
    setSelectedSeat(seat);
  };

  const handleConfirmSeat = () => {
    if (!selectedSeat) {
      alert("Please select a seat before continuing.");
      return;
    }
    navigate("/payment"); // ✅ Redirect to payment page
  };

  return (
    <div className="seat-selection">
      <h2>✈ Seat Selection</h2>
      <p>Select your preferred seat below:</p>

      <div className="plane-view">
        {[...Array(rows)].map((_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className="seat-row">
              {cols.map((col) => {
                const seat = `${rowNumber}${col}`; // ✅ fixed template literal
                const isOccupied = occupiedSeats.includes(seat);
                const isSelected = selectedSeat === seat;

                return (
                  <button
                    key={seat}
                    className={`seat 
                      ${isOccupied ? "occupied" : ""} 
                      ${isSelected ? "selected" : ""} 
                      ${col === "D" ? "gap-left" : ""}
                    `}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isOccupied}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="seat-footer">
        <div className="legend">
          <div>
            <span className="legend-box available"></span> Available
          </div>
          <div>
            <span className="legend-box selected"></span> Selected
          </div>
          <div>
            <span className="legend-box occupied"></span> Occupied
          </div>
        </div>

        <p>
          Selected Seat: <strong>{selectedSeat ? selectedSeat : "None"}</strong>
        </p>

        <button className="confirm-seat-btn" onClick={handleConfirmSeat}>
          Confirm Seat
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
