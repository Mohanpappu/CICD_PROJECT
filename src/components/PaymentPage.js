import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedTab, setSelectedTab] = useState("card");
  const [selectedOption, setSelectedOption] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    if (!selectedOption) {
      alert("Please select a payment method before continuing.");
      return;
    }
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>🎉 Payment Successful!</h2>
        <p>Your booking has been confirmed.</p>
        <p>Thank you for choosing us ❤</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2 className="heading">💳 Payment Portal</h2>

      {/* Tabs */}
      <div className="payment-tabs">
        <button
          className={selectedTab === "card" ? "active" : ""}
          onClick={() => setSelectedTab("card")}
        >
          Credit Card
        </button>
        <button
          className={selectedTab === "qr" ? "active" : ""}
          onClick={() => setSelectedTab("qr")}
        >
          QR Scan
        </button>
        <button
          className={selectedTab === "vpn" ? "active" : ""}
          onClick={() => setSelectedTab("vpn")}
        >
          Bank VPN
        </button>
      </div>

      {/* Credit Card Section */}
      {selectedTab === "card" && (
        <div className="card-container">
          <h3>Enter Credit Card Details</h3>
          <input type="text" placeholder="Card Number (XXXX XXXX XXXX XXXX)" />
          <input type="text" placeholder="Cardholder Name" />
          <div className="card-row">
            <input type="text" placeholder="MM/YY" />
            <input type="password" placeholder="CVV" />
          </div>

          <div className="other-payments">
            <h4>Other Payment Methods</h4>

            {/* UPI */}
            <label className="option">
              <input
                type="radio"
                name="payment"
                value="upi"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              🟢 UPI (Google Pay, PhonePe, Paytm)
            </label>
            {selectedOption === "upi" && (
              <div className="upi-box">
                <input type="text" placeholder="Enter UPI ID (e.g. user@upi)" />
              </div>
            )}

            {/* Net Banking */}
            <label className="option">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              🏦 Net Banking
            </label>
            {selectedOption === "netbanking" && (
              <div className="bank-box">
                <select>
                  <option>Select Your Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Wallet */}
            <label className="option">
              <input
                type="radio"
                name="payment"
                value="wallet"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              👜 Wallets (Paytm, Amazon Pay, Freecharge)
            </label>
            {selectedOption === "wallet" && (
              <div className="wallet-box">
                <select>
                  <option>Select Wallet</option>
                  <option>Paytm</option>
                  <option>Amazon Pay</option>
                  <option>PhonePe Wallet</option>
                </select>
              </div>
            )}

            {/* EMI */}
            <label className="option">
              <input
                type="radio"
                name="payment"
                value="emi"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              🏛 EMI (Credit Card / Bank Loan)
            </label>
            {selectedOption === "emi" && (
              <div className="emi-box">
                <select>
                  <option>Select EMI Duration</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>
            )}
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            💰 Pay ₹8,500
          </button>
        </div>
      )}

      {/* QR Scan */}
      {selectedTab === "qr" && (
        <div className="qr-container">
          <h3>Scan to Pay</h3>
          <p>Use your UPI app to scan the QR and complete the payment.</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=demo@upi"
            alt="QR Code"
            className="qr-image"
          />
        </div>
      )}

      {/* Bank VPN */}
      {selectedTab === "vpn" && (
        <div className="vpn-container">
          <h3>Secure Payment via Bank VPN</h3>
          <p>Connect through your bank’s VPN for extra security.</p>
          <button className="vpn-btn">Connect Bank VPN</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
    