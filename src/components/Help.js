import React, { useState } from "react";
import "./Help.css";

const Help = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How can I reset my password?",
      a: "Go to Login → Forgot Password → Enter your email. You’ll receive a reset link instantly.",
    },
    {
      q: "How do I track my booking?",
      a: "Login → My Bookings → Select Booking ID → View live status.",
    },
    {
      q: "Can I cancel a ticket online?",
      a: "Yes. Navigate to My Bookings → Select Ticket → Cancel. Refunds will be processed within 5–7 business days.",
    },
    {
      q: "How can I contact support quickly?",
      a: "You can call our 24x7 toll-free helpline or use the Live Chat option below.",
    },
    {
      q: "Do you provide travel insurance?",
      a: "Yes! You can select travel insurance during booking. It covers delays, cancellations, and emergencies.",
    },
  ];

  const guides = [
    { title: "Booking Guide", desc: "Step-by-step process to book flights, trains, hotels, and more." },
    { title: "Refund Policy", desc: "Learn how refunds are processed for different types of cancellations." },
    { title: "Travel Insurance", desc: "Understand our insurance policies and how they protect you." },
    { title: "Account Management", desc: "Update profile, manage saved cards, and change passwords easily." },
  ];

  return (
    <div className="help-page">
      {/* Hero Banner */}
      <header className="help-hero">
        <h1>❓ Help & Support</h1>
        <p>We’re here to guide you every step of the way</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search help topics, e.g. refund, cancellation..."
        />
      </header>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Help</h2>
        <div className="link-cards">
          <div className="link-card">
            <h3>📞 Customer Care</h3>
            <p>Connect with our 24x7 support team</p>
            <a href="/customer-care" className="btn-link">Contact Now</a>
          </div>
          <div className="link-card">
            <h3>💳 Refunds</h3>
            <p>Check refund status and timelines</p>
            <button className="btn-link" onClick={() => alert("Learn more clicked!")}>
              Learn More
            </button>
          </div>
          <div className="link-card">
            <h3>🛫 Bookings</h3>
            <p>Manage or cancel your bookings</p>
            <a href="/viewstatus" className="btn-link">View Bookings</a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            >
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="guide-section">
        <h2>Guides & Resources</h2>
        <div className="guide-cards">
          {guides.map((guide, idx) => (
            <div key={idx} className="guide-card">
              <h3>{guide.title}</h3>
              <p>{guide.desc}</p>
              <button className="guide-btn">Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Live Chat */}
      <section className="chat-section">
        <h2>💬 Need More Help?</h2>
        <button
          className="chat-btn"
          onClick={() => alert("Live chat support coming soon!")}
        >
          Start Live Chat
        </button>
      </section>
    </div>
  );
};

export default Help;
