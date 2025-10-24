import React from "react";
import "./Viewstatus.css";   // Import CSS

const Viewstatus = () => {
  const dates = ["Fri, 19", "Sat, 20", "Sun, 21", "Mon, 22", "Tue, 23", "Wed, 24", "Thu, 25"];
  const train = {
    number: "12129",
    name: "Azad Hind Exp",
    from: "PUNE",
    to: "HWH",
    dep: "18:35",
    arr: "05:10",
    duration: "34h 35m",
    rating: 3.6,
    classes: [
      { type: "SL", status: "WL 103", price: 810, chance: "39%" },
      { type: "SL Tatkal", status: "WL 46", price: 1010, chance: "39%" },
      { type: "3A", status: "WL 45", price: 2105, chance: "Alternate Travel Plan" },
      { type: "3A Tatkal", status: "WL 17", price: 2525, chance: "59%" },
    ],
  };

  return (
    <main className="viewcolour">
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
       
      </header>

      {/* Dates Row */}
      <div className="dates-row">
        {dates.map((date, i) => (
          <div key={i} className="date-card">
            {date} <span className="few-seats">• Few Seats</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filters">
        <label><input type="checkbox" /> Best Available</label>
        <label><input type="checkbox" /> Tatkal Only</label>
        <label><input type="checkbox" /> AC Only</label>
      </div>

      {/* Free Cancellation */}
      <div className="free-cancel">
        <h2>Free Cancellation</h2>
        <p>Get full refund of your train fare on cancellation *</p>
      </div>

      {/* Train Card */}
      <div className="train-card">
        <div className="train-header">
          <div>
            <h3>{train.number} {train.name}</h3>
            <p>{train.dep} {train.from} ➝ {train.arr} {train.to}</p>
            <small>{train.duration}</small>
          </div>
          <span className="rating">⭐ {train.rating}</span>
        </div>

        <div className="train-classes">
          {train.classes.map((cls, i) => (
            <div key={i} className="class-card">
              <p className="class-type">{cls.type}</p>
              <p className="status">{cls.status}</p>
              <p className="price">₹{cls.price}</p>
              <p className="chance">{cls.chance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  );
};

export default Viewstatus;
