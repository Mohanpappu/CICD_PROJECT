import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Travel from "./components/Travel";
import Viewstatus from "./components/Viewstatus";
import Flights from "./components/Flights";
import Trains from "./components/Trains";
import Hotels from "./components/Hotels";
import Buses from "./components/Buses";
import BusesResult from "./components/BusesResult";
import SelectSeats from "./components/SelectSeats";
import Payment from "./components/Payment";
import BookingConfirm from "./components/BookingConfirm";
import TicketPrint from "./components/TicketPrint";

import TrainBook from "./components/TrainBook";
import TrainResults from "./components/TrainResults";
import BookingConfirmation from "./components/BookingConfirmation";
import BankTransition from "./components/BankTransition";

import Cabs from "./components/Cabs";
import Offers from "./components/Offers";
import CustomerCare from "./components/CustomerCare";
import Help from "./components/Help";
import About from "./components/About";
import ContactUs from "./components/ContactUs";

import SearchResults from "./components/SearchResults";
import BookingPage from "./components/BookingPage";
import SeatSelection from "./components/SeatSelection";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Wrap all routes inside <Routes> */}
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/viewstatus" element={<Viewstatus />} />

          {/* Booking pages */}
          <Route path="/flights" element={<Flights />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/busesresult" element={<BusesResult />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm-booking" element={<BookingConfirm />} />

          <Route path="/train-results" element={<TrainResults />} />
          <Route path="/train-book" element={<TrainBook />} />
          <Route path="/bank-transition" element={<BankTransition />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          {/* ✈️ Flight booking routes */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/payment-page" element={<PaymentPage />} />

          <Route path="/ticket" element={<TicketPrint />} />
          <Route path="/cabs" element={<Cabs />} />

          {/* Extra pages */}
          <Route path="/offers" element={<Offers />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
