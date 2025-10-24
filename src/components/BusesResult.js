import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BusesResult.css";

const BusesResult = () => {
  const { state } = useLocation();
  const { results = [], form } = state || {};
  const navigate = useNavigate();

  return (
    <div className="buses-result">
      <h2>Buses from {form.from} to {form.to} on {form.date}</h2>
      <div className="buses-list">
        {results.map((bus) => (
          <div className="bus-card" key={bus.id}>
            <h3>{bus.operator}</h3>
            <p>{bus.depart} → {bus.arrive} | Duration: {bus.duration}</p>
            <p>Fare: ₹{bus.fare} | Features: {bus.features.join(", ")}</p>
            <button onClick={() => navigate("/select-seats", { state: { bus, form } })}>
              Select Seats
            </button>
          </div>
        ))}
      </div>
      <div className="modify-search">
        <button onClick={() => navigate("/buses")}>Modify Search</button>
      </div>
    </div>
  );
};

export default BusesResult;
