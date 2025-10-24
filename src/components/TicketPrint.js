import React from "react";
import { useLocation } from "react-router-dom";
import "./TicketPrint.css";

const TicketPrint = () => {
  const { state } = useLocation();
  const { bus, selectedSeats, passengers } = state;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ticket-page">
      <div className="ticket-card">
        <h1>Bus Ticket</h1>
        <p><strong>Operator:</strong> {bus.operator}</p>
        <p><strong>Route:</strong> {bus.from} → {bus.to}</p>
        <p><strong>Date:</strong> {bus.date}</p>
        <p><strong>Departure:</strong> {bus.depart} | <strong>Arrival:</strong> {bus.arrive}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>

        <h3>Passenger Details</h3>
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((p, idx) => (
              <tr key={idx}>
                <td>{selectedSeats[idx]}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="print-ticket-btn" onClick={handlePrint}>Print Ticket</button>
      </div>
    </div>
  );
};

export default TicketPrint;
