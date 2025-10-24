import React, { useState } from "react";
import "./Hotels.css";

/**
 * Hotels booking UI (ConformTicket-like)
 * - Search box (city, check-in, check-out, guests)
 * - Mock search results with hotel cards
 * - Discount offers carousel
 * - Why choose us
 * - Partners
 */

const MOCK_HOTELS = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    city: "Mumbai",
    rating: 4.5,
    price: "₹2,999/night",
    amenities: ["Free WiFi", "Breakfast Included", "Pool"],
    img: "https://picsum.photos/300/180?random=11",
  },
  {
    id: 2,
    name: "Sea Breeze Resort",
    city: "Goa",
    rating: 4.2,
    price: "₹3,499/night",
    amenities: ["Beach View", "AC Rooms", "Spa"],
    img: "https://picsum.photos/300/180?random=12",
  },
  {
    id: 3,
    name: "Skyline Inn",
    city: "Delhi",
    rating: 4.0,
    price: "₹2,299/night",
    amenities: ["Gym", "Restaurant", "Airport Pickup"],
    img: "https://picsum.photos/300/180?random=13",
  },
];

const Hotels = () => {
  const [form, setForm] = useState({
    city: "",
    checkin: "",
    checkout: "",
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.city.trim()) errs.city = "Enter a city or hotel name";
    if (!form.checkin) errs.checkin = "Select check-in date";
    if (!form.checkout) errs.checkout = "Select check-out date";
    if (form.checkin && form.checkout && form.checkout < form.checkin) {
      errs.checkout = "Check-out must be after check-in";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const filtered = MOCK_HOTELS.filter((h) =>
        h.city.toLowerCase().includes(form.city.toLowerCase())
      );
      setResults(filtered.length ? filtered : MOCK_HOTELS);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="hotels-root">
      {/* Search */}
      <section className="hotel-search-wrap">
        <div className="hotel-search-card">
          <form className="hotel-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field">
                <span className="field-label">City / Hotel</span>
                <input
                  name="city"
                  placeholder="Enter city or hotel name"
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && <small className="field-error">{errors.city}</small>}
              </label>

              <label className="field">
                <span className="field-label">Check-in</span>
                <input
                  type="date"
                  name="checkin"
                  value={form.checkin}
                  onChange={handleChange}
                />
                {errors.checkin && <small className="field-error">{errors.checkin}</small>}
              </label>

              <label className="field">
                <span className="field-label">Check-out</span>
                <input
                  type="date"
                  name="checkout"
                  value={form.checkout}
                  onChange={handleChange}
                />
                {errors.checkout && <small className="field-error">{errors.checkout}</small>}
              </label>

              <label className="field small">
                <span className="field-label">Guests</span>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  value={form.guests}
                  onChange={handleChange}
                />
              </label>

              <div className="field actions">
                <button type="submit" className="primary-btn">
                  {loading ? "Searching…" : "Search"}
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setForm({ city: "", checkin: "", checkout: "", guests: 1 });
                    setResults(null);
                    setErrors({});
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Offers */}
      <section className="hotel-offers">
        <h3>Hotel Booking Offers</h3>
        <div className="offers-carousel">
          <div className="offer-card">
            <div className="offer-badge">25% OFF</div>
            <p>First Hotel Booking</p>
          </div>
          <div className="offer-card">
            <div className="offer-badge">Flat ₹1000</div>
            <p>Weekend Special</p>
          </div>
          <div className="offer-card">
            <div className="offer-badge">50% OFF</div>
            <p>Luxury Hotels Fest</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="hotel-results">
        <h3>Available Hotels</h3>
        {loading && <div className="loader">Searching hotels…</div>}

        {!loading && results && (
          <div className="results-grid">
            {results.map((h) => (
              <div key={h.id} className="hotel-card">
                <img src={h.img} alt={h.name} />
                <div className="hotel-info">
                  <h4>{h.name}</h4>
                  <p className="city">{h.city}</p>
                  <p className="rating">⭐ {h.rating}</p>
                  <div className="amenities">
                    {h.amenities.map((a) => (
                      <span key={a} className="pill">{a}</span>
                    ))}
                  </div>
                  <div className="hotel-footer">
                    <span className="price">{h.price}</span>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="hotel-why">
        <h3>Why Book Hotels With Us?</h3>
        <div className="why-grid">
          <div className="why-card">🏨 10,000+ Hotels</div>
          <div className="why-card">💳 Best Price Guarantee</div>
          <div className="why-card">⚡ Instant Booking</div>
          <div className="why-card">🛎️ 24/7 Support</div>
          <div className="why-card">🔁 Easy Refunds</div>
        </div>
      </section>

      {/* Partners */}
      <section className="hotel-partners">
        <h3>Our Hotel Partners</h3>
        <div className="partners-grid">
          {["OYO", "Taj", "Hyatt", "Marriott", "Radisson", "ITC"].map((p) => (
            <div key={p} className="partner">{p}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hotels;
