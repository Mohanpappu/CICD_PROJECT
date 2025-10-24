import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// A simple seat grid representation
const generateSeats = (numRows, seatsPerRow) => {
  const seats = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < seatsPerRow; j++) {
      const seatNumber = `${String.fromCharCode(65 + i)}${j + 1}`;
      // Randomly mark some as booked to simulate real-world availability
      seats.push({ id: seatNumber, number: seatNumber, isBooked: Math.random() < 0.2 });
    }
  }
  return seats;
};


const TrainBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, searchParams } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    if (!train) {
      navigate("/trains"); // Redirect if no train data is passed
      return;
    }
    setAvailableSeats(generateSeats(5, 4)); // Example: 5 rows, 4 seats per row
    // Initial calculation of total price will happen in the subsequent useEffect
  }, [train, navigate]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSeats, train]); // Recalculate if selected seats or train data changes

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const calculateTotalPrice = () => {
    if (!train || selectedSeats.length === 0) {
      setTotalPrice(0);
      return;
    }

    // --- MODIFIED LOGIC FOR ROBUST PRICE PARSING ---
    // 1. Clean the price string: remove any characters that are NOT a digit or a decimal point.
    // This handles currency symbols, commas, and other non-numeric characters.
    const cleanedPriceString = train.price.replace(/[^\d.]/g, '');

    // 2. Parse the cleaned string to a float.
    const pricePerSeat = parseFloat(cleanedPriceString);

    // 3. Ensure pricePerSeat is a valid number, default to 0 if parsing fails (e.g., empty string).
    if (isNaN(pricePerSeat)) {
      setTotalPrice(0);
      return;
    }
    // --- END MODIFIED LOGIC ---

    setTotalPrice(selectedSeats.length * pricePerSeat);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      setBookingStatus("Please select at least one seat.");
      return;
    }

    setBookingStatus("Redirecting to payment gateway...");
    navigate("/bank-transition", {
      state: { train, selectedSeats, totalPrice, searchParams }
    });
  };

  if (!train) {
    return (
      <div className="trainbook-root text-center py-10">
        <p className="text-red-600 text-lg">Loading train details or no train selected. Redirecting...</p>
      </div>
    );
  }

  // Determine the currency symbol from train.price more robustly.
  // This regex matches any non-digit, non-decimal characters at the beginning of the string.
  const currencySymbolMatch = train.price.match(/^[^\d.]+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : "₹"; // Default to ₹ if no explicit symbol found

  return (
    <>
      <style>
        {`
          .trainbook-root {
            padding: 30px;
            max-width: 900px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', sans-serif;
            color: #1f2937;
          }

          .back-btn {
            background: none;
            border: none;
            color: #3b82f6;
            cursor: pointer;
            font-size: 1rem;
            padding: 5px 0;
            margin-bottom: 25px;
            font-weight: 500;
            transition: color 0.2s;
            display: inline-block;
          }
          .back-btn:hover {
            color: #2563eb;
            text-decoration: underline;
          }

          .header-title {
            font-size: 2.25rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
          }

          .train-info-card {
            border: 1px solid #bfdbfe;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            background-color: #eff6ff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .train-info-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 10px;
          }
          .train-info-card p {
            font-size: 0.95rem;
            color: #4b5563;
            margin-bottom: 5px;
          }
          .train-info-card .train-price {
            font-size: 1.75rem;
            font-weight: 800;
            color: #10b981;
            margin-top: 15px;
          }
          .train-info-card .font-medium {
            font-weight: 500;
            color: #1f2937;
          }

          .seat-selection-header {
            font-size: 1.75rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            text-align: center;
          }

          .seat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
            margin-bottom: 25px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            background-color: #f9fafb;
          }

          .seat-button {
            padding: 12px 8px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.2s ease-in-out;
            border: 1px solid transparent;
            min-width: 70px;
          }
          .seat-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .seat-button:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: none;
          }

          .seat-booked {
            background-color: #fecaca; /* red-200 */
            color: #b91c1c; /* red-700 */
            cursor: not-allowed;
            border-color: #f87171; /* red-400 */
          }
          .seat-selected {
            background-color: #34d399; /* green-400 */
            color: #ffffff;
            border-color: #059669; /* green-600 */
            box-shadow: 0 2px 8px rgba(52, 211, 153, 0.4);
          }
          .seat-available {
            background-color: #93c5fd; /* blue-300 */
            color: #1e40af; /* blue-800 */
            border-color: #60a5fa; /* blue-400 */
          }
          .seat-available:hover {
            background-color: #60a5fa; /* blue-400 */
            color: #ffffff;
          }

          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            color: #4b5563;
          }
          .legend-color-box {
            width: 18px;
            height: 18px;
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,0.1);
          }

          .booking-summary-card {
            border: 1px solid #fcd34d;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            background-color: #fffbeb; /* yellow-50 */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .booking-summary-card h4 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #b45309; /* amber-700 */
            margin-bottom: 15px;
          }
          .booking-summary-card p {
            font-size: 1.05rem;
            color: #78350f; /* amber-900 */
            margin-bottom: 8px;
          }
          .booking-summary-card .total-price-display {
            font-size: 1.8rem;
            font-weight: 800;
            color: #dc2626; /* red-600 */
            margin-top: 15px;
          }

          .status-message {
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-weight: 600;
            font-size: 1rem;
          }
          .status-success {
            background-color: #d1fae5; /* green-100 */
            color: #065f46; /* green-800 */
          }
          .status-error {
            background-color: #fee2e2; /* red-100 */
            color: #991b1b; /* red-800 */
          }
          .status-info {
            background-color: #e0f2fe; /* blue-100 */
            color: #1e40af; /* blue-800 */
          }

          .payment-button {
            width: 100%;
            padding: 18px;
            border-radius: 10px;
            color: white;
            font-size: 1.4rem;
            font-weight: 700;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          }
          .payment-button:not(:disabled) {
            background-color: #4f46e5; /* indigo-600 */
          }
          .payment-button:not(:disabled):hover {
            background-color: #4338ca; /* indigo-700 */
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
          }
          .payment-button:disabled {
            background-color: #9ca3af; /* gray-400 */
            cursor: not-allowed;
            box-shadow: none;
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .trainbook-root {
              padding: 20px;
              margin: 20px auto;
              box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            }
            .header-title {
              font-size: 1.8rem;
            }
            .train-info-card h3, .seat-selection-header, .booking-summary-card h4 {
              font-size: 1.3rem;
            }
            .seat-grid {
              grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
              gap: 10px;
              padding: 15px;
            }
            .seat-button {
              padding: 10px 5px;
              font-size: 0.8rem;
              min-width: 50px;
            }
            .payment-button {
              padding: 15px;
              font-size: 1.2rem;
            }
          }
          @media (max-width: 480px) {
            .trainbook-root {
              padding: 15px;
              margin: 15px auto;
            }
            .header-title {
              font-size: 1.5rem;
            }
            .train-info-card h3, .seat-selection-header, .booking-summary-card h4 {
              font-size: 1.1rem;
            }
            .train-info-card .train-price, .booking-summary-card .total-price-display {
              font-size: 1.5rem;
            }
            .seat-grid {
              grid-template-columns: repeat(3, 1fr); /* Force 3 columns on very small screens */
            }
            .legend-item {
              font-size: 0.8rem;
            }
          }
        `}
      </style>

      <div className="trainbook-root">
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← Back to Train Results
        </button>

        <h2 className="header-title">Book Your Train Journey</h2>

        <div className="train-info-card">
          <h3>{train.name} (#{train.number})</h3>
          <p>From: <span className="font-medium">{train.from}</span> to <span className="font-medium">{train.to}</span></p>
          <p>Date: {searchParams.date} | Departure: {train.departure} | Arrival: {train.arrival}</p>
          <p>Class: {train.class} | Duration: {train.duration}</p>
          <p className="train-price">Base Price: {train.price}</p>
        </div>

        <h4 className="seat-selection-header">Select Your Seats</h4>
        <div className="seat-grid">
          {availableSeats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
              className={`
                seat-button
                ${seat.isBooked
                  ? 'seat-booked'
                  : selectedSeats.includes(seat.id)
                    ? 'seat-selected'
                    : 'seat-available'
                }
              `}
              disabled={seat.isBooked}
            >
              {seat.number} {seat.isBooked && ""}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
            <span className="legend-item"><div className="legend-color-box bg-blue-300"></div> Available</span>
            <span className="legend-item"><div className="legend-color-box bg-green-400"></div> Selected</span>
            <span className="legend-item"><div className="legend-color-box bg-red-200"></div> Booked</span>
        </div>


        <div className="booking-summary-card">
          <h4>Booking Summary</h4>
          <p>Selected Seats: <span className="font-medium">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span></p>
          <p className="total-price-display">Total Price: {currencySymbol}{totalPrice.toFixed(2)}</p>
        </div>

        {bookingStatus && (
          <p className={`status-message ${
            bookingStatus.includes("successful") ? "status-success" :
            bookingStatus.includes("failed") ? "status-error" :
            "status-info"
          }`}>
            {bookingStatus}
          </p>
        )}

        <button
          onClick={handleProceedToPayment}
          disabled={selectedSeats.length === 0 || bookingStatus.includes("Redirecting")}
          className="payment-button"
        >
          Proceed to Payment
        </button>
      </div>
    </>
  );
};

export default TrainBook;