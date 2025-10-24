import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, totalPrice, searchParams } = location.state || {};

  if (!train || !selectedSeats || selectedSeats.length === 0) {
    return (
      <>
        <style>
          {`
            .confirmation-root {
              padding: 30px;
              max-width: 700px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
              font-family: 'Inter', sans-serif;
              color: #1f2937;
              text-align: center;
            }
            .error-message {
              font-size: 1.5rem;
              font-weight: 700;
              color: #dc2626; /* red-600 */
              margin-bottom: 20px;
            }
            .go-back-btn {
              background-color: #3b82f6; /* blue-500 */
              color: white;
              border: none;
              padding: 12px 25px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: background-color 0.2s, box-shadow 0.2s;
              font-size: 1.1rem;
            }
            .go-back-btn:hover {
              background-color: #2563eb; /* blue-600 */
              box-shadow: 0 4px 10px rgba(59, 130, 246, 0.4);
            }
          `}
        </style>
        <div className="confirmation-root">
          <h2 className="error-message">No Booking Details Found!</h2>
          <p className="text-gray-700 mb-6">It looks like you landed here without a successful booking. Please go back to search for trains.</p>
          <button 
            onClick={() => navigate("/trains")}
            className="go-back-btn"
          >
            Go to Train Search
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          .confirmation-root {
            padding: 30px;
            max-width: 700px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            font-family: 'Inter', sans-serif;
            color: #1f2937;
          }

          .confirmation-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #059669; /* green-600 */
            margin-bottom: 15px;
            text-align: center;
          }
          .confirmation-subtitle {
            text-align: center;
            font-size: 1.1rem;
            color: #4b5563;
            margin-bottom: 30px;
          }

          .info-block {
            border: 1px solid #d1fae5; /* green-100 */
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            background-color: #ecfdf5; /* green-50 */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .info-block h3 {
            font-size: 1.4rem;
            font-weight: 700;
            color: #065f46; /* green-800 */
            margin-bottom: 10px;
          }
          .info-block p {
            font-size: 0.95rem;
            color: #374151;
            margin-bottom: 5px;
          }
          .info-block .font-medium {
            font-weight: 500;
            color: #1f2937;
          }

          .details-block {
            border: 1px solid #bfdbfe; /* blue-200 */
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            background-color: #eff6ff; /* blue-50 */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .details-block h4 {
            font-size: 1.4rem;
            font-weight: 700;
            color: #1e40af; /* blue-800 */
            margin-bottom: 15px;
          }
          .details-block p {
            font-size: 1.05rem;
            color: #374151;
            margin-bottom: 8px;
          }
          .details-block .total-paid-display {
            font-size: 1.8rem;
            font-weight: 800;
            color: #4f46e5; /* indigo-600 */
            margin-top: 15px;
          }

          .thank-you-message {
            text-align: center;
            color: #6b7280;
            font-size: 1rem;
            margin-bottom: 30px;
          }

          .book-again-btn {
            display: block;
            width: 100%;
            text-align: center;
            background-color: #3b82f6; /* blue-500 */
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 1.25rem;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .book-again-btn:hover {
            background-color: #2563eb; /* blue-600 */
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .confirmation-root {
              padding: 20px;
              margin: 20px auto;
              box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
            }
            .confirmation-title {
              font-size: 2rem;
            }
            .info-block h3, .details-block h4 {
              font-size: 1.2rem;
            }
            .details-block .total-paid-display {
              font-size: 1.6rem;
            }
            .book-again-btn {
              padding: 12px 20px;
              font-size: 1.1rem;
            }
          }
          @media (max-width: 480px) {
            .confirmation-root {
              padding: 15px;
              margin: 15px auto;
            }
            .confirmation-title {
              font-size: 1.8rem;
            }
            .confirmation-subtitle {
              font-size: 0.95rem;
            }
            .info-block h3, .details-block h4 {
              font-size: 1.1rem;
            }
            .details-block .total-paid-display {
              font-size: 1.4rem;
            }
            .book-again-btn {
              padding: 10px 15px;
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="confirmation-root">
        <h2 className="confirmation-title">Booking Confirmed!</h2>
        <p className="confirmation-subtitle">Your journey has been successfully booked.</p>

        <div className="info-block">
          <h3>Train: {train.name} (#{train.number})</h3>
          <p>Route: <span className="font-medium">{train.from}</span> to <span className="font-medium">{train.to}</span></p>
          <p>Date: {searchParams.date} | Departure: {train.departure} | Arrival: {train.arrival}</p>
          <p>Class: {train.class} | Duration: {train.duration}</p>
        </div>

        <div className="details-block">
          <h4>Your Booking Details</h4>
          <p>Selected Seats: <span className="font-bold">{selectedSeats.join(", ")}</span></p>
          <p className="total-paid-display">Total Paid: ${totalPrice.toFixed(2)}</p>
        </div>

        <p className="thank-you-message">Thank you for booking with us! We look forward to seeing you.</p>

        <button 
          onClick={() => navigate("/trains")}
          className="book-again-btn"
        >
          Book Another Train
        </button>
      </div>
    </>
  );
};

export default BookingConfirmation;