import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/India";
import { generateBuses } from "../data/busesData";
import "./Buses.css";

const Buses = () => {
  const [form, setForm] = useState({ from: "", to: "", date: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.from) errs.from = "Select departure city";
    if (!form.to) errs.to = "Select destination city";
    if (!form.date) errs.date = "Select travel date";
    if (form.from && form.to && form.from === form.to)
      errs.to = "Departure and destination cannot be same";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const filtered = generateBuses(form.from, form.to, form.date);
    navigate("/busesresult", { state: { results: filtered, form } });
  };

  return (
    <div className="buses-root">
      <h2>Search Buses</h2>
      <form className="buses-form" onSubmit={handleSubmit}>
        <label>
          From:
          <select name="from" value={form.from} onChange={handleChange}>
            <option value="">Select City</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.from && <small className="error">{errors.from}</small>}
        </label>
        <label>
          To:
          <select name="to" value={form.to} onChange={handleChange}>
            <option value="">Select City</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {errors.to && <small className="error">{errors.to}</small>}
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          {errors.date && <small className="error">{errors.date}</small>}
        </label>
        <button className="primary-btn" type="submit">Search</button>
      </form>
    </div>
  );
};

export default Buses;
