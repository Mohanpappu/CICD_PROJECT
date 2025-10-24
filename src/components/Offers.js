import React from "react";
import "./Offers.css";

const Offers = () => {
  const offers = [
    { title: "✈️ Flights", desc: "Get 20% Off on Domestic Flights", code: "FLY20" },
    { title: "🚆 Trains", desc: "Flat ₹50 Cashback on Train Bookings", code: "TRAIN50" },
    { title: "🚌 Buses", desc: "Save up to ₹200 on Bus Tickets", code: "BUS200" },
    { title: "🏨 Hotels", desc: "Upto 40% Off on Hotel Stays", code: "STAY40" },
    { title: "🚖 Cabs", desc: "Flat 15% Off on First Cab Ride", code: "CAB15" },
  ];

  const flashDeals = [
    { title: "Mega Flight Sale", desc: "Flat 30% Off", timer: "2h 15m left" },
    { title: "Hotel Weekend Bonanza", desc: "Save up to 50%", timer: "5h 45m left" },
  ];

  return (
    <div className="offers-page">
      {/* Banner */}
      <div className="offers-banner">
        <h1>🎉 Exclusive Travel Offers</h1>
        <p>Grab the best deals before they’re gone!</p>
      </div>

      {/* Offers Section */}
      <div className="offers-section">
        <h2>🔥 Available Offers</h2>
        <div className="offer-cards">
          {offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <span className="coupon">Use Code: <b>{offer.code}</b></span>
              <button className="apply-btn">Apply</button>
            </div>
          ))}
        </div>
      </div>

      {/* Flash Deals */}
      <div className="flash-deals">
        <h2>⚡ Flash Deals</h2>
        <div className="deal-cards">
          {flashDeals.map((deal, index) => (
            <div key={index} className="deal-card">
              <h3>{deal.title}</h3>
              <p>{deal.desc}</p>
              <span className="timer">⏳ {deal.timer}</span>
              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
