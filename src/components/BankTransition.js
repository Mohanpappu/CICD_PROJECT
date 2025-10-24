import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BankTransition = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, totalPrice, searchParams } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState("");
  const [countdown, setCountdown] = useState(60); // 60 seconds for payment completion
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card"); // Default to credit card

  // Credit Card State (for demonstration)
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardError, setCardError] = useState(""); // New state for credit card errors

  // VPN State (for demonstration)
  const [vpnKey, setVpnKey] = useState("");
  const [vpnError, setVpnError] = useState(""); // New state for VPN errors

  const [secureConnection, setSecureConnection] = useState(false); // Simulate VPN/Secure Connection

  const timerRef = useRef(null); // Ref to hold the interval ID

  // Function to handle successful payment and redirection
  const handlePaymentSuccess = (method) => {
    // Reset errors
    setCardError("");
    setVpnError("");

    let isValid = true;

    // Client-side validation based on selected method
    if (method === "Credit Card") {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        setCardError("Please enter a valid 16-digit card number.");
        isValid = false;
      }
      if (!cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        setCardError(prev => prev + (prev ? " " : "") + "Please enter a valid MM/YY expiry date.");
        isValid = false;
      }
      if (!cardCVV || !/^\d{3,4}$/.test(cardCVV)) {
        setCardError(prev => prev + (prev ? " " : "") + "Please enter a valid 3 or 4 digit CVV.");
        isValid = false;
      }
    } else if (method === "Bank VPN") {
      if (!vpnKey || vpnKey.length < 6) { // Example: require minimum 6 chars for VPN key
        setVpnError("Please enter your VPN security key (min 6 characters).");
        isValid = false;
      }
    } else if (method === "QR Scan") {
      // For QR, you might assume scanning is handled externally, or add a simple check
      // For this example, we'll assume "Scan & Pay" button press implies user action.
    }


    if (!isValid) {
      setPaymentStatus("Please correct the payment details.");
      return; // Stop if validation fails
    }


    if (timerRef.current) {
      clearInterval(timerRef.current); // Stop the countdown
    }
    setPaymentStatus("Payment confirmed! Redirecting to booking confirmation...");
    setSecureConnection(true); // Ensure secure connection is shown as active on success
    setTimeout(() => {
      navigate("/booking-confirmation", {
        state: { train, selectedSeats, totalPrice, searchParams, paymentMethod: method }
      });
    }, 1500); // Short delay for visual feedback before redirect
  };

  useEffect(() => {
    if (!train || !selectedSeats || totalPrice === 0) {
      navigate("/trains");
      return;
    }

    setPaymentStatus("Please complete your payment within the time limit.");
    setSecureConnection(true); // Simulate a secure connection is established initially

    timerRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          setSecureConnection(false); // Connection ends on timeout
          setPaymentStatus("Payment timed out. Please try again.");
          setTimeout(() => navigate(-1), 3000); // Go back on timeout
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current); // Cleanup timer on component unmount
      }
    };
  }, [train, selectedSeats, totalPrice, searchParams, navigate]);

  if (!train || !selectedSeats || totalPrice === 0) {
    return (
      <div className="bank-root text-center py-10">
        <p className="text-red-600 text-lg">Missing booking details. Redirecting...</p>
      </div>
    );
  }

  const renderPaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case "credit_card":
        return (
          <div className="payment-details-card credit-card-form">
            <h4 className="form-title">Enter Credit Card Details</h4>
            <div className="input-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                className="input-field"
              />
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <div className="input-group w-1/2">
                <label htmlFor="cardExpiry">Expiry Date:</label>
                <input
                  type="text"
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="input-field"
                />
              </div>
              <div className="input-group w-1/2">
                <label htmlFor="cardCVV">CVV:</label>
                <input
                  type="text"
                  id="cardCVV"
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                  placeholder="XXX"
                  maxLength="4"
                  className="input-field"
                />
              </div>
            </div>
            {cardError && <p className="error-message text-red-500 mt-3">{cardError}</p>} {/* Error display */}
            <button className="pay-button mt-6" onClick={() => handlePaymentSuccess("Credit Card")}>
              Pay Now
            </button>
            <p className="bank-note text-center mt-4">
              Your payment will be processed securely.
            </p>
          </div>
        );
      case "qr_scan":
        return (
          <div className="payment-details-card qr-scan-section">
            <h4 className="form-title">Scan to Pay</h4>
            <div className="qr-code-placeholder">
              <p>QR Code Placeholder</p>
              <div className="qr-image"></div> {/* Visual cue for QR code */}
            </div>
            <button className="pay-button mt-6" onClick={() => handlePaymentSuccess("QR Scan")}>
              Scan & Pay
            </button>
            <p className="bank-note text-center mt-4">
              Open your banking app and scan the QR code to complete the payment.
            </p>
          </div>
        );
      case "bank_vpn":
        return (
          <div className="payment-details-card vpn-payment-section">
            <h4 className="form-title">Secure Bank VPN Payment</h4>
            <p className="vpn-info">
              Establishing a secure connection to your bank via VPN for direct debit.
              Please ensure your VPN service is active for seamless transaction.
            </p>
            <div className="input-group mt-5">
              <label htmlFor="vpnKey">VPN Key / PIN:</label>
              <input
                type="password" // Use type="password" for sensitive input
                id="vpnKey"
                value={vpnKey}
                onChange={(e) => setVpnKey(e.target.value)}
                placeholder="Enter your VPN security key"
                className="input-field"
              />
            </div>
            {vpnError && <p className="error-message text-red-500 mt-3">{vpnError}</p>} {/* Error display */}
            <div className="secure-connection-status mt-4">
                {secureConnection ? (
                    <span className="secure-connection-indicator active">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3.5 3.5a3.5 3.5 0 11-7 0v3.5h7V4.5z" clipRule="evenodd" />
                        </svg>
                        VPN Connection: Secure
                    </span>
                ) : (
                    <span className="secure-connection-indicator disconnected">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zM7 9H5V5.5A3.5 3.5 0 018.5 2h3A3.5 3.5 0 0115 5.5V9h-2v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1z" clipRule="evenodd" />
                        </svg>
                        VPN Connection: Insecure
                    </span>
                )}
            </div>
            <button className="pay-button mt-6" onClick={() => handlePaymentSuccess("Bank VPN")}>
              Confirm VPN Payment
            </button>
            <p className="bank-note text-center mt-4">
              Your transaction is protected by end-to-end encryption.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>
        {`
          .bank-root {
            padding: 30px;
            max-width: 800px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', sans-serif;
            color: #1f2937;
            text-align: center;
          }
          .bank-header {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 25px;
          }
          .bank-subheader {
            font-size: 1.5rem;
            font-weight: 600;
            color: #3b82f6;
            margin-bottom: 20px;
          }
          .payment-method-selector {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            gap: 15px;
          }
          .payment-method-btn {
            background-color: #e0f2fe; /* blue-100 */
            color: #1e40af; /* blue-800 */
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid #90cdf4; /* blue-300 */
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease-in-out;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          .payment-method-btn.active {
            background-color: #3b82f6; /* blue-500 */
            color: #ffffff;
            border-color: #3b82f6;
            box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
            transform: translateY(-2px);
          }
          .payment-method-btn:hover:not(.active) {
            background-color: #bfdbfe; /* blue-200 */
            transform: translateY(-1px);
          }

          /* General card for payment details */
          .payment-details-card {
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: left;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          }
          .payment-details-card p {
            font-size: 1.1rem;
            margin-bottom: 12px;
            color: #374151;
            line-height: 1.6;
          }
          .payment-details-card .label {
            font-weight: 600;
            color: #1f2937;
            display: inline-block;
            width: 150px; /* Align labels */
          }
          .payment-details-card .value {
            font-family: 'Roboto Mono', monospace; /* Monospaced font for numbers */
            color: #ef4444; /* red-500 */
            font-weight: 700;
          }

          /* Credit Card Form specific styles */
          .credit-card-form {
            text-align: center;
            background-color: #f0fdf4; /* green-50 */
            border: 1px solid #a7f3d0; /* green-200 */
          }
          .credit-card-form .form-title {
            font-size: 1.6rem;
            font-weight: 600;
            color: #065f46; /* green-800 */
            margin-bottom: 20px;
          }
          .credit-card-form .input-group {
            margin-bottom: 15px;
            text-align: left;
          }
          .credit-card-form label {
            display: block;
            font-size: 0.95rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 5px;
          }
          .credit-card-form .input-field {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #d1fae5; /* green-200 */
            border-radius: 6mm;
            font-size: 1rem;
            font-family: 'Roboto Mono', monospace;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
            transition: border-color 0.2s ease-in-out;
          }
          .credit-card-form .input-field:focus {
            outline: none;
            border-color: #34d399; /* green-400 */
            box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.2);
          }

          /* QR Scan specific styles */
          .qr-scan-section {
            text-align: center;
            background-color: #fefce8; /* yellow-50 */
            border: 1px solid #fde68a; /* yellow-200 */
          }
          .qr-scan-section .form-title {
            font-size: 1.6rem;
            font-weight: 600;
            color: #b45309; /* amber-700 */
            margin-bottom: 20px;
          }
          .qr-code-placeholder {
            width: 200px;
            height: 200px;
            background-color: #fff7ed; /* orange-50 */
            border: 2px dashed #fbbf24; /* amber-400 */
            border-radius: 8px;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
            color: #d97706; /* amber-700 */
          }
          .qr-code-placeholder .qr-image {
            width: 150px; /* Smaller inner box for visual */
            height: 150px;
            background-color: #fcd34d; /* amber-300 */
            border-radius: 4px;
          }

          /* VPN Payment Section */
          .vpn-payment-section {
            text-align: center;
            background-color: #eff6ff; /* blue-50 */
            border: 1px solid #bfdbfe; /* blue-200 */
          }
          .vpn-payment-section .form-title {
            font-size: 1.6rem;
            font-weight: 600;
            color: #1e40af; /* blue-800 */
            margin-bottom: 20px;
          }
          .vpn-payment-section .vpn-info {
            font-size: 1.05rem;
            color: #374151;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          .vpn-payment-section .input-group {
            margin-bottom: 15px;
            text-align: left;
            max-width: 400px; /* Limit width for input */
            margin-left: auto;
            margin-right: auto;
          }
          .vpn-payment-section label {
            display: block;
            font-size: 0.95rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 5px;
          }
          .vpn-payment-section .input-field {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #90cdf4; /* blue-300 */
            border-radius: 6px;
            font-size: 1rem;
            font-family: 'Roboto Mono', monospace;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
            transition: border-color 0.2s ease-in-out;
          }
          .vpn-payment-section .input-field:focus {
            outline: none;
            border-color: #3b82f6; /* blue-500 */
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          }

          .secure-connection-status {
            display: flex;
            justify-content: center;
            margin-top: 15px;
          }

          .pay-button {
            background-color: #10b981; /* green-500 */
            color: white;
            padding: 12px 25px;
            border-radius: 8px;
            border: none;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
          }
          .pay-button:hover {
            background-color: #059669; /* green-600 */
            transform: translateY(-1px);
          }
          .pay-button:active {
            transform: translateY(1px);
          }

          .bank-summary {
            background-color: #fffbeb; /* yellow-50 */
            border: 1px solid #fcd34d; /* yellow-300 */
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .bank-summary h4 {
            font-size: 1.6rem;
            color: #b45309; /* amber-700 */
            margin-bottom: 10px;
          }
          .bank-summary .total-amount {
            font-size: 2.5rem;
            font-weight: 800;
            color: #dc2626; /* red-600 */
            margin-bottom: 15px;
          }
          .bank-status {
            font-size: 1.2rem;
            font-weight: 600;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .bank-status-pending {
            background-color: #e0f2fe; /* blue-100 */
            color: #1e40af; /* blue-800 */
          }
          .bank-status-success {
            background-color: #d1fae5; /* green-100 */
            color: #065f46; /* green-800 */
          }
          .bank-status-error {
            background-color: #fee2e2; /* red-100 */
            color: #991b1b; /* red-800 */
          }
          .bank-note {
            font-size: 0.95rem;
            color: #6b7280;
            margin-top: 20px;
          }
          .countdown-timer {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ef4444; /* red-500 */
            margin-top: 15px;
          }
          .secure-connection-indicator {
            font-size: 0.95rem;
            color: #047857; /* green-700 */
            background-color: #d1fae5; /* green-100 */
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 10px;
            font-weight: 500;
            transition: all 0.3s ease-in-out;
          }
          .secure-connection-indicator.disconnected {
            color: #dc2626; /* red-600 */
            background-color: #fee2e2; /* red-100 */
          }
          .secure-connection-indicator svg {
            width: 18px;
            height: 18px;
          }
          .error-message {
            font-size: 0.9rem;
            color: #ef4444; /* red-500 */
            margin-top: 8px;
            text-align: center;
            font-weight: 500;
          }


          @media (max-width: 768px) {
            .bank-root {
              padding: 20px;
              margin: 20px auto;
            }
            .bank-header {
              font-size: 2rem;
            }
            .bank-subheader {
              font-size: 1.3rem;
            }
            .payment-details-card p {
              font-size: 1rem;
            }
            .bank-summary h4 {
              font-size: 1.4rem;
            }
            .bank-summary .total-amount {
              font-size: 2rem;
            }
            .payment-method-selector {
              flex-direction: column;
              gap: 10px;
            }
            .payment-method-btn {
              width: 80%;
              margin: 0 auto;
            }
          }
          @media (max-width: 480px) {
            .bank-root {
              padding: 15px;
              margin: 15px auto;
            }
            .bank-header {
              font-size: 1.8rem;
            }
            .bank-subheader {
              font-size: 1.1rem;
            }
            .payment-details-card .label {
              width: auto;
              display: block;
              margin-bottom: 5px;
            }
            .payment-method-btn {
              width: 100%;
            }
            .vpn-payment-section .input-group {
              max-width: 100%;
            }
          }
        `}
      </style>

      <div className="bank-root">
        <h2 className="bank-header">Complete Your Payment</h2>
        <p className="bank-subheader">Select a payment method and complete the transaction securely.</p>

        <div className="payment-method-selector">
  <button
    className={`payment-method-btn ${selectedPaymentMethod === "credit_card" ? "active" : ""}`}
    onClick={() => {setSelectedPaymentMethod("credit_card"); setCardError(""); setPaymentStatus("");}}
  >
    Credit Card
  </button>
  <button
    className={`payment-method-btn ${selectedPaymentMethod === "qr_scan" ? "active" : ""}`}
    onClick={() => {setSelectedPaymentMethod("qr_scan"); setCardError(""); setVpnError(""); setPaymentStatus("");}}
  >
    QR Scan
  </button>
  <button
    className={`payment-method-btn ${selectedPaymentMethod === "bank_vpn" ? "active" : ""}`}
    onClick={() => {setSelectedPaymentMethod("bank_vpn"); setVpnError(""); setPaymentStatus("");}}
  >
    Bank VPN
  </button>
</div>


        {renderPaymentDetails()}

        <div className="bank-summary">
          <h4>Amount to Pay</h4>
          <p className="total-amount">₹{totalPrice.toFixed(2)}</p> {/* Changed to Indian Rupee symbol */}
          <p>For Train: <span className="font-medium">{train.name} (#{train.number})</span></p>
          <p>Seats: <span className="font-medium">{selectedSeats.join(", ")}</span></p>
        </div>

        {paymentStatus && (
          <p className={`bank-status ${
            paymentStatus.includes("confirmed") ? "bank-status-success" :
            paymentStatus.includes("failed") || paymentStatus.includes("timed out") || paymentStatus.includes("correct the payment details") ? "bank-status-error" :
            "bank-status-pending"
          }`}>
            {paymentStatus}
          </p>
        )}
        {countdown > 0 && !paymentStatus.includes("confirmed") && !paymentStatus.includes("failed") && (
            <p className="countdown-timer">Time remaining: {countdown} seconds</p>
        )}

        <p className="bank-note">
          <span className="font-bold">Do not refresh this page</span> until payment is confirmed.
        </p>
      </div>
    </>
  );
};

export default BankTransition;