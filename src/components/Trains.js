import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trains.css";

// ------------------------------------------------------------------
// 1. DATA SETUP
// ------------------------------------------------------------------

const INDIAN_CITIES = [
  "Select Station",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Kolkata",
  "Bengaluru",
  "Pune",
  "Jaipur",
];

const MOCK_TRAINS = [
    // ------------------------------------------------------------------
    // Mumbai Departures (IDs 1-9)
    // ------------------------------------------------------------------
    { id: 1, name: "Shatabdi Express", number: "12009", from: "Mumbai", to: "Ahmedabad", departure: "06:30", arrival: "12:45", duration: "6h 15m", price: "₹850", class: "AC Chair Car" },
    { id: 2, name: "Rajdhani Express", number: "12951", from: "Mumbai", to: "Delhi", departure: "17:00", arrival: "09:30", duration: "16h 30m", price: "₹2,800", class: "AC 1 Tier" },
    { id: 3, name: "Konark Express", number: "11019", from: "Mumbai", to: "Chennai", departure: "15:10", arrival: "22:40", duration: "31h 30m", price: "₹1,800", class: "AC 3 Tier" },
    { id: 4, name: "LTT Shalimar Exp", number: "18029", from: "Mumbai", to: "Kolkata", departure: "22:00", arrival: "11:30", duration: "37h 30m", price: "₹1,150", class: "Sleeper" },
    { id: 5, name: "Hussain Sagar", number: "12701", from: "Mumbai", to: "Hyderabad", departure: "21:50", arrival: "10:55", duration: "13h 05m", price: "₹950", class: "AC 3 Tier" },
    { id: 6, name: "Udyan Express", number: "11301", from: "Mumbai", to: "Bengaluru", departure: "08:00", arrival: "06:30", duration: "22h 30m", price: "₹1,300", class: "AC 2 Tier" },
    { id: 7, name: "Deccan Express", number: "11007", from: "Mumbai", to: "Pune", departure: "07:00", arrival: "11:30", duration: "4h 30m", price: "₹350", class: "Chair Car" },
    { id: 8, name: "Ranthambore Exp", number: "12465", from: "Mumbai", to: "Jaipur", departure: "12:40", arrival: "06:00", duration: "17h 20m", price: "₹2,100", class: "AC 2 Tier" },
    // New train added
       { id: 10, name: "Mumbai Superfast", number: "10001", from: "Mumbai", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Mumbai", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Mumbai", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Mumbai", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Mumbai", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Mumbai", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Mumbai", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // Delhi Departures (IDs 101-108)
    // ------------------------------------------------------------------
    { id: 101, name: "Duronto Express", number: "12264", from: "Delhi", to: "Mumbai", departure: "13:20", arrival: "06:15", duration: "16h 55m", price: "₹3,050", class: "AC 2 Tier" },
    { id: 102, name: "Tamil Nadu Exp", number: "12622", from: "Delhi", to: "Chennai", departure: "21:05", arrival: "06:35", duration: "33h 30m", price: "₹2,200", class: "AC 3 Tier" },
    { id: 103, name: "Andhra Pradesh", number: "22415", from: "Delhi", to: "Hyderabad", departure: "06:25", arrival: "04:30", duration: "22h 05m", price: "₹3,100", class: "AC 1 Tier" },
    { id: 104, name: "Howrah Rajdhani", number: "12302", from: "Delhi", to: "Kolkata", departure: "16:55", arrival: "09:55", duration: "17h 00m", price: "₹3,450", class: "AC 1 Tier" },
    { id: 105, name: "Karnataka Exp", number: "12628", from: "Delhi", to: "Bengaluru", departure: "20:20", arrival: "05:00", duration: "32h 40m", price: "₹1,950", class: "Sleeper / AC 3 Tier" },
    { id: 106, name: "Gomti Express", number: "12419", from: "Delhi", to: "Jaipur", departure: "06:00", arrival: "11:30", duration: "5h 30m", price: "₹600", class: "AC Chair Car" },
    { id: 107, name: "Swarna Jayanti", number: "12782", from: "Delhi", to: "Ahmedabad", departure: "18:35", arrival: "11:00", duration: "16h 25m", price: "₹2,350", class: "AC 2 Tier" },
    { id: 108, name: "Goa Express", number: "12780", from: "Delhi", to: "Pune", departure: "15:15", arrival: "15:55", duration: "24h 40m", price: "₹1,500", class: "AC 3 Tier" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Delhi", to: "Mumbai", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Delhi", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Delhi", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Delhi", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Delhi", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Delhi", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Delhi", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // Chennai Departures (IDs 201-208)
    // ------------------------------------------------------------------
    { id: 201, name: "Chennai Mail", number: "12840", from: "Chennai", to: "Kolkata", departure: "23:45", arrival: "06:50", duration: "31h 05m", price: "₹2,050", class: "AC 2 Tier" },
    { id: 202, name: "Central Express", number: "12658", from: "Chennai", to: "Delhi", departure: "06:40", arrival: "15:35", duration: "32h 55m", price: "₹1,200", class: "Sleeper" },
    { id: 203, name: "Charminar Exp", number: "12759", from: "Chennai", to: "Hyderabad", departure: "18:10", arrival: "08:00", duration: "13h 50m", price: "₹990", class: "AC 3 Tier" },
    { id: 204, name: "Shatabdi Exp", number: "12011", from: "Chennai", to: "Bengaluru", departure: "06:00", arrival: "11:00", duration: "5h 00m", price: "₹750", class: "Chair Car" },
    { id: 205, name: "Navjeevan Exp", number: "12643", from: "Chennai", to: "Ahmedabad", departure: "10:00", arrival: "16:35", duration: "30h 35m", price: "₹1,700", class: "AC 3 Tier" },
    { id: 206, name: "M'lore Express", number: "12601", from: "Chennai", to: "Mumbai", departure: "09:50", arrival: "16:15", duration: "29h 25m", price: "₹1,450", class: "AC 2 Tier" },
    { id: 207, name: "LTT Express", number: "12164", from: "Chennai", to: "Pune", departure: "18:40", arrival: "14:15", duration: "19h 35m", price: "₹1,100", class: "Sleeper / AC 3 Tier" },
    { id: 208, name: "Superfast Exp", number: "12970", from: "Chennai", to: "Jaipur", departure: "17:35", arrival: "06:15", duration: "36h 40m", price: "₹2,550", class: "AC 2 Tier" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Chennai", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Chennai", to: "Mumbai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Chennai", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Chennai", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Chennai", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Chennai", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Chennai", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // Hyderabad Departures (IDs 301-308)
    // ------------------------------------------------------------------
    { id: 301, name: "Hyderabad Exp", number: "12723", from: "Hyderabad", to: "Delhi", departure: "06:00", arrival: "04:00", duration: "22h 00m", price: "₹2,900", class: "AC 1 Tier" },
    { id: 302, name: "Konark Express", number: "12749", from: "Hyderabad", to: "Mumbai", departure: "15:00", arrival: "07:15", duration: "16h 15m", price: "₹1,150", class: "AC 3 Tier" },
    { id: 303, name: "Secunderabad Exp", number: "12704", from: "Hyderabad", to: "Kolkata", departure: "22:15", arrival: "04:30", duration: "30h 15m", price: "₹1,950", class: "AC 2 Tier" },
    { id: 304, name: "Duronto Express", number: "12245", from: "Hyderabad", to: "Chennai", departure: "22:30", arrival: "06:00", duration: "7h 30m", price: "₹1,050", class: "Sleeper / AC 3 Tier" },
    { id: 305, name: "Hyderabad-Pune", number: "17014", from: "Hyderabad", to: "Pune", departure: "20:30", arrival: "09:30", duration: "13h 00m", price: "₹850", class: "Sleeper" },
    { id: 306, name: "Bhuj Express", number: "11092", from: "Hyderabad", to: "Ahmedabad", departure: "15:45", arrival: "17:00", duration: "25h 15m", price: "₹1,600", class: "AC 3 Tier" },
    { id: 307, name: "Rajkot Express", number: "16613", from: "Hyderabad", to: "Jaipur", departure: "18:00", arrival: "05:15", duration: "35h 15m", price: "₹1,300", class: "Sleeper" },
    { id: 308, name: "Hyderabad Exp", number: "18567", from: "Hyderabad", to: "Bengaluru", departure: "17:00", arrival: "05:00", duration: "12h 00m", price: "₹700", class: "Chair Car" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Hyderabad", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Hyderabad", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Hyderabad", to: "Mumbai", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Hyderabad", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Hyderabad", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Hyderabad", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Hyderabad", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // Kolkata Departures (IDs 401-408)
    // ------------------------------------------------------------------
    { id: 401, name: "Howrah Duronto", number: "12222", from: "Kolkata", to: "Pune", departure: "08:15", arrival: "11:30", duration: "27h 15m", price: "₹3,150", class: "AC 2 Tier" },
    { id: 402, name: "Howrah Mail", number: "12809", from: "Kolkata", to: "Mumbai", departure: "21:15", arrival: "06:00", duration: "32h 45m", price: "₹1,250", class: "Sleeper" },
    { id: 403, name: "Howrah Rajdhani", number: "12301", from: "Kolkata", to: "Delhi", departure: "16:50", arrival: "10:00", duration: "17h 10m", price: "₹3,450", class: "AC 1 Tier" },
    { id: 404, name: "Coromandel Exp", number: "12841", from: "Kolkata", to: "Chennai", departure: "14:50", arrival: "17:10", duration: "26h 20m", price: "₹2,100", class: "AC 2 Tier" },
    { id: 405, name: "Howrah Exp", number: "12863", from: "Kolkata", to: "Bengaluru", departure: "08:35", arrival: "16:35", duration: "32h 00m", price: "₹1,850", class: "AC 3 Tier" },
    { id: 406, name: "Puri Express", number: "18401", from: "Kolkata", to: "Hyderabad", departure: "20:00", arrival: "02:30", duration: "30h 30m", price: "₹1,100", class: "Sleeper" },
    { id: 407, name: "Howrah-Ahmedabad", number: "12834", from: "Kolkata", to: "Ahmedabad", departure: "12:15", arrival: "19:00", duration: "30h 45m", price: "₹1,750", class: "AC 3 Tier" },
    { id: 408, name: "Howrah-Jaipur", number: "12987", from: "Kolkata", to: "Jaipur", departure: "23:00", arrival: "00:40", duration: "25h 40m", price: "₹2,250", class: "AC 2 Tier" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Kolkata", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Kolkata", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Kolkata", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Kolkata", to: "Mumbai", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Kolkata", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Kolkata", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Kolkata", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // Pune Departures (IDs 501-508)
    // ------------------------------------------------------------------
    { id: 501, name: "Jhelum Express", number: "11077", from: "Pune", to: "Delhi", departure: "17:20", arrival: "13:00", duration: "43h 40m", price: "₹1,350", class: "Sleeper" },
    { id: 502, name: "Azad Hind Exp", number: "12129", from: "Pune", to: "Kolkata", departure: "18:35", arrival: "04:30", duration: "33h 55m", price: "₹2,150", class: "AC 2 Tier" },
    { id: 503, name: "Shatabdi Exp", number: "12027", from: "Pune", to: "Mumbai", departure: "05:50", arrival: "09:10", duration: "3h 20m", price: "₹450", class: "AC Chair Car" },
    { id: 504, name: "Pune Express", number: "12104", from: "Pune", to: "Hyderabad", departure: "18:20", arrival: "07:30", duration: "13h 10m", price: "₹950", class: "AC 3 Tier" },
    { id: 505, name: "Siddheshwar Exp", number: "12115", from: "Pune", to: "Chennai", departure: "20:15", arrival: "15:40", duration: "19h 25m", price: "₹1,550", class: "AC 2 Tier" },
    { id: 506, name: "Jodhpur Express", number: "14805", from: "Pune", to: "Ahmedabad", departure: "20:00", arrival: "11:55", duration: "15h 55m", price: "₹1,050", class: "Sleeper" },
    { id: 507, name: "Pune-Bengaluru", number: "11035", from: "Pune", to: "Bengaluru", departure: "11:00", arrival: "04:00", duration: "17h 00m", price: "₹1,200", class: "AC 3 Tier" },
    { id: 508, name: "Ranakpur Road", number: "14728", from: "Pune", to: "Jaipur", departure: "16:40", arrival: "15:20", duration: "22h 40m", price: "₹1,850", class: "AC 2 Tier" },
    
      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Pune", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Pune", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Pune", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Pune", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Pune", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Pune", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Pune", to: "Mumbai", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // NEW Jaipur Departures (IDs 801-808)
    // ------------------------------------------------------------------
    { id: 801, name: "Shatabdi Exp", number: "12015", from: "Jaipur", to: "Delhi", departure: "06:00", arrival: "10:30", duration: "4h 30m", price: "₹750", class: "AC Chair Car" },
    { id: 802, name: "Jaipur Exp", number: "12980", from: "Jaipur", to: "Mumbai", departure: "07:00", arrival: "05:30", duration: "22h 30m", price: "₹1,650", class: "AC 3 Tier" },
    { id: 803, name: "Bhopal Exp", number: "19711", from: "Jaipur", to: "Pune", departure: "15:00", arrival: "15:00", duration: "24h 00m", price: "₹1,500", class: "AC 3 Tier" },
    { id: 804, name: "Dayodaya Exp", number: "12181", from: "Jaipur", to: "Hyderabad", departure: "12:50", arrival: "08:00", duration: "19h 10m", price: "₹1,800", class: "AC 2 Tier" },
    { id: 805, name: "Jaipur-Chennai", number: "12968", from: "Jaipur", to: "Chennai", departure: "19:35", arrival: "10:00", duration: "38h 25m", price: "₹2,000", class: "Sleeper" },
    { id: 806, name: "Intercity Exp", number: "12982", from: "Jaipur", to: "Ahmedabad", departure: "20:00", arrival: "08:15", duration: "12h 15m", price: "₹900", class: "AC Chair Car" },
    { id: 807, name: "Jaipur-Kolkata", number: "12318", from: "Jaipur", to: "Kolkata", departure: "00:15", arrival: "01:30", duration: "25h 15m", price: "₹2,600", class: "AC 2 Tier" },
    { id: 808, name: "Jodhpur Exp", number: "16533", from: "Jaipur", to: "Bengaluru", departure: "04:30", arrival: "01:00", duration: "44h 30m", price: "₹1,850", class: "AC 3 Tier" },
    
      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Jaipur", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Jaipur", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Jaipur", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Jaipur", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Jaipur", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Jaipur", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Jaipur", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // NEW Bengaluru Departures (IDs 601-608)
    // ------------------------------------------------------------------
    { id: 601, name: "Rajdhani Exp", number: "22691", from: "Bengaluru", to: "Delhi", departure: "20:00", arrival: "05:00", duration: "33h 00m", price: "₹4,100", class: "AC 1 Tier" },
    { id: 602, name: "Mumbai Express", number: "11014", from: "Bengaluru", to: "Mumbai", departure: "16:00", arrival: "16:00", duration: "24h 00m", price: "₹1,300", class: "AC 3 Tier" },
    { id: 603, name: "Bangalore Exp", number: "12657", from: "Bengaluru", to: "Chennai", departure: "22:40", arrival: "04:20", duration: "5h 40m", price: "₹800", class: "AC Chair Car" },
    { id: 604, name: "Kaveri Exp", number: "16229", from: "Bengaluru", to: "Hyderabad", departure: "18:00", arrival: "05:30", duration: "11h 30m", price: "₹950", class: "AC 3 Tier" },
    { id: 605, name: "YPR Howrah", number: "12864", from: "Bengaluru", to: "Kolkata", departure: "19:35", arrival: "04:00", duration: "32h 25m", price: "₹2,100", class: "AC 2 Tier" },
    { id: 606, name: "Garib Nawaz", number: "16534", from: "Bengaluru", to: "Jaipur", departure: "17:00", arrival: "08:30", duration: "39h 30m", price: "₹1,600", class: "Sleeper" },
    { id: 607, name: "BGKT Express", number: "16532", from: "Bengaluru", to: "Ahmedabad", departure: "16:00", arrival: "21:30", duration: "29h 30m", price: "₹1,750", class: "AC 3 Tier" },
    { id: 608, name: "Siddheshwar Exp", number: "12116", from: "Bengaluru", to: "Pune", departure: "07:30", arrival: "00:10", duration: "16h 40m", price: "₹1,250", class: "AC 2 Tier" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Bengaluru", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Bengaluru", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Bengaluru", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Bengaluru", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Bengaluru", to: "Mumbai", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Bengaluru", to: "Ahmedabad", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Bengaluru", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

    // ------------------------------------------------------------------
    // NEW Ahmedabad Departures (IDs 701-708)
    // ------------------------------------------------------------------
    { id: 701, name: "Duronto Exp", number: "12268", from: "Ahmedabad", to: "Chennai", departure: "21:40", arrival: "04:30", duration: "30h 50m", price: "₹2,100", class: "AC 2 Tier" },
    { id: 702, name: "Ahmedabad Mail", number: "12903", from: "Ahmedabad", to: "Kolkata", departure: "23:00", arrival: "13:00", duration: "38h 00m", price: "₹1,950", class: "AC 3 Tier" },
    { id: 703, name: "Gujarat Exp", number: "19011", from: "Ahmedabad", to: "Mumbai", departure: "05:45", arrival: "14:45", duration: "9h 00m", price: "₹700", class: "Chair Car" },
    { id: 704, name: "Ashram Exp", number: "12915", from: "Ahmedabad", to: "Delhi", departure: "15:20", arrival: "09:30", duration: "18h 10m", price: "₹2,450", class: "AC 2 Tier" },
    { id: 705, name: "Saurashtra Exp", number: "19050", from: "Ahmedabad", to: "Pune", departure: "00:05", arrival: "15:00", duration: "14h 55m", price: "₹950", class: "Sleeper" },
    { id: 706, name: "Humsafar Exp", number: "22967", from: "Ahmedabad", to: "Jaipur", departure: "16:00", arrival: "06:15", duration: "14h 15m", price: "₹1,400", class: "AC 3 Tier" },
    { id: 707, name: "Vasco Express", number: "17320", from: "Ahmedabad", to: "Bengaluru", departure: "19:25", arrival: "03:30", duration: "32h 05m", price: "₹1,850", class: "AC 3 Tier" },
    { id: 708, name: "Rajahmundry Exp", number: "18402", from: "Ahmedabad", to: "Hyderabad", departure: "22:00", arrival: "03:00", duration: "29h 00m", price: "₹1,500", class: "Sleeper" },

      { id: 10, name: "Mumbai Superfast", number: "10001", from: "Ahmedabad", to: "Delhi", departure: "10:00", arrival: "04:00", duration: "18h 00m", price: "₹2,900", class: "AC 1 Tier" }, // Mumbai to Delhi (already had Rajdhani, this is another)
    { id: 11, name: "Coastal Express", number: "10002", from: "Ahmedabad", to: "Chennai", departure: "14:00", arrival: "21:00", duration: "31h 00m", price: "₹1,900", class: "AC 2 Tier" }, // Mumbai to Chennai (already had Konark, this is another)
    { id: 12, name: "Deccan Queen", number: "10003", from: "Ahmedabad", to: "Hyderabad", departure: "09:00", arrival: "22:00", duration: "13h 00m", price: "₹1,000", class: "AC Chair Car" }, // Mumbai to Hyderabad (already had Hussain Sagar, this is another)
    { id: 13, name: "Eastern Star", number: "10004", from: "Ahmedabad", to: "Kolkata", departure: "18:00", arrival: "07:00", duration: "37h 00m", price: "₹1,300", class: "AC 3 Tier" }, // Mumbai to Kolkata (already had LTT Shalimar, this is another)
    { id: 14, name: "Western Ghats Exp", number: "10005", from: "Ahmedabad", to: "Bengaluru", departure: "23:00", arrival: "21:00", duration: "22h 00m", price: "₹1,400", class: "Sleeper / AC 3 Tier" }, // Mumbai to Bengaluru (already had Udyan, this is another)
    { id: 15, name: "Gateway Express", number: "10006", from: "Ahmedabad", to: "Mumbai", departure: "08:00", arrival: "14:30", duration: "6h 30m", price: "₹900", class: "AC Chair Car" }, // Mumbai to Ahmedabad (already had Shatabdi, this is another)
    { id: 16, name: "Sahyadri Link", number: "10007", from: "Ahmedabad", to: "Pune", departure: "06:00", arrival: "09:45", duration: "3h 45m", price: "₹400", class: "Chair Car" }, // Mumbai to Pune (already had Deccan, this is another)

     { id: 317, name: "Hyderabad Exp 3", number: "12726", from: "Hyderabad", to: "Delhi", departure: "10:00", arrival: "08:00", duration: "22h 00m", price: "₹2,850", class: "AC 1 Tier" },
  { id: 318, name: "Konark Exp 3", number: "12750", from: "Hyderabad", to: "Mumbai", departure: "23:00", arrival: "15:15", duration: "16h 15m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 319, name: "Secunderabad Exp 3", number: "12706", from: "Hyderabad", to: "Kolkata", departure: "10:15", arrival: "16:30", duration: "30h 15m", price: "₹1,900", class: "AC 2 Tier" },
  { id: 320, name: "Duronto Exp 3", number: "12247", from: "  ", to: "Chennai", departure: "08:30", arrival: "16:00", duration: "7h 30m", price: "₹1,000", class: "Sleeper / AC 3 Tier" },
  { id: 321, name: "Hyderabad-Pune 3", number: "17016", from: "Hyderabad", to: "Pune", departure: "10:30", arrival: "23:30", duration: "13h 00m", price: "₹800", class: "Sleeper" },
  { id: 322, name: "Bhuj Exp 3", number: "11094", from: "Hyderabad", to: "Ahmedabad", departure: "05:45", arrival: "07:00", duration: "25h 15m", price: "₹1,550", class: "AC 3 Tier" },
  { id: 323, name: "Rajkot Exp 3", number: "16615", from: "Hyderabad", to: "Jaipur", departure: "08:00", arrival: "19:15", duration: "35h 15m", price: "₹1,250", class: "Sleeper" },
  { id: 324, name: "Hyderabad Exp B 3", number: "18569", from: "Hyderabad", to: "Bengaluru", departure: "10:00", arrival: "22:00", duration: "12h 00m", price: "₹650", class: "Chair Car" },
  
  // Ahmedabad (A) - Missing second set of unique routes (IDs 717-724)
  { id: 717, name: "Duronto Exp 3", number: "12270", from: "Ahmedabad", to: "Chennai", departure: "09:40", arrival: "16:30", duration: "30h 50m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 718, name: "Ahmedabad Mail 3", number: "12905", from: "Ahmedabad", to: "Kolkata", departure: "07:00", arrival: "21:00", duration: "38h 00m", price: "₹1,850", class: "AC 3 Tier" },
  { id: 719, name: "Gujarat Exp 3", number: "19013", from: "Ahmedabad", to: "Mumbai", departure: "15:45", arrival: "00:45", duration: "9h 00m", price: "₹600", class: "Chair Car" },
  { id: 720, name: "Ashram Exp 3", number: "12917", from: "Ahmedabad", to: "Delhi", departure: "23:20", arrival: "17:30", duration: "18h 10m", price: "₹2,350", class: "AC 2 Tier" },
  { id: 721, name: "Saurashtra Exp 3", number: "19052", from: "Ahmedabad", to: "Pune", departure: "12:05", arrival: "03:00", duration: "14h 55m", price: "₹850", class: "Sleeper" },
  { id: 722, name: "Humsafar Exp 3", number: "22969", from: "Ahmedabad", to: "Jaipur", departure: "23:00", arrival: "13:15", duration: "14h 15m", price: "₹1,300", class: "AC 3 Tier" },
  { id: 723, name: "Vasco Exp 3", number: "17322", from: "Ahmedabad", to: "Bengaluru", departure: "05:25", arrival: "13:30", duration: "32h 05m", price: "₹1,750", class: "AC 3 Tier" },
  { id: 724, name: "Rajahmundry Exp 3", number: "18404", from: "Ahmedabad", to: "Hyderabad", departure: "04:00", arrival: "09:00", duration: "29h 00m", price: "₹1,400", class: "Sleeper" },


  // Bengaluru (B) - Missing second set of unique routes (IDs 617-624)
  { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Bengaluru", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Bengaluru", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Bengaluru", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Bengaluru", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Bengaluru", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Bengaluru", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Bengaluru", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Bengaluru", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },

   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Jaipur", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Jaipur", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Jaipur", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Jaipur", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Jaipur", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Jaipur", to: "Bengaluru", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Jaipur", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Jaipur", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },

   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Pune", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Pune", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Pune", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Pune", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Pune", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Pune", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Pune", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Pune", to: "Bengaluru", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },


  
   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Kolkata", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Kolkata", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Kolkata", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Kolkata", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Kolkata", to: "Bengaluru", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Kolkata", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Kolkata", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Kolkata", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },


   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Chennai", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Chennai", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Chennai", to: "Bengaluru", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Chennai", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Chennai", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Chennai", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Chennai", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Chennai", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },


   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Mumbai", to: "Delhi", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Mumbai", to: "Bengaluru", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Mumbai", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Mumbai", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Mumbai", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Mumbai", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Mumbai", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Mumbai", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },


   { id: 617, name: "Rajdhani Exp 3", number: "22693", from: "Delhi", to: "Bengaluru", departure: "00:00", arrival: "09:00", duration: "33h 00m", price: "₹4,000", class: "AC 1 Tier" },
  { id: 618, name: "Mumbai Exp 3", number: "11016", from: "Delhi", to: "Mumbai", departure: "05:00", arrival: "05:00", duration: "24h 00m", price: "₹1,200", class: "AC 3 Tier" },
  { id: 619, name: "Bangalore Exp 3", number: "12659", from: "Delhi", to: "Chennai", departure: "01:40", arrival: "07:20", duration: "5h 40m", price: "₹700", class: "AC Chair Car" },
  { id: 620, name: "Kaveri Exp 3", number: "16231", from: "Delhi", to: "Hyderabad", departure: "09:00", arrival: "20:30", duration: "11h 30m", price: "₹850", class: "AC 3 Tier" },
  { id: 621, name: "YPR Howrah 3", number: "12866", from: "Delhi", to: "Kolkata", departure: "07:35", arrival: "16:00", duration: "32h 25m", price: "₹2,000", class: "AC 2 Tier" },
  { id: 622, name: "Garib Nawaz 3", number: "16536", from: "Delhi", to: "Jaipur", departure: "09:00", arrival: "00:30", duration: "39h 30m", price: "₹1,500", class: "Sleeper" },
  { id: 623, name: "BGKT Exp 3", number: "16534", from: "Delhi", to: "Ahmedabad", departure: "08:00", arrival: "13:30", duration: "29h 30m", price: "₹1,650", class: "AC 3 Tier" },
  { id: 624, name: "Siddheshwar Exp 3", number: "12118", from: "Delhi", to: "Pune", departure: "17:30", arrival: "10:10", duration: "16h 40m", price: "₹1,150", class: "AC 2 Tier" },

  ];
// ------------------------------------------------------------------
// 2. COMPONENT LOGIC
// ------------------------------------------------------------------
const Trains = () => {
  const navigate = useNavigate();
  const initialForm = {
    from: "Select Station",
    to: "Select Station",
    date: "",
    passengers: 1,
    class: "Sleeper",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (form.from === "Select Station") errs.from = "Select departure station";
    if (form.to === "Select Station") errs.to = "Select destination station";
    if (!form.date) errs.date = "Select journey date";
    if (form.from !== "Select Station" && form.from === form.to) {
      errs.from = "Departure and destination must be different";
      errs.to = "Departure and destination must be different";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      const filtered = MOCK_TRAINS.filter(
        (t) =>
          t.from.toLowerCase() === form.from.toLowerCase() &&
          t.to.toLowerCase() === form.to.toLowerCase()
      );

      setLoading(false);

      navigate("/train-results", {
        state: {
          results: filtered,
          searchParams: { from: form.from, to: form.to, date: form.date, class: form.class },
        },
      });
    }, 800);
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
  };

  // --- JSX Rendering ---
  return (
    <div className="trains-root">
      {/* Video Background */}
      <video autoPlay loop muted className="video-background">
        {/* UPDATED PATH: Use /videos/travel1 (2).mp4 */}
        <source src="/videos/tt.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Layer over the video */}
      <div className="trains-content-overlay">
        {/* Search */}
        <section className="train-search-wrap">
          <div className="train-search-card">
            <form className="train-form" onSubmit={handleSubmit}>
              <div className="form-row">
                {/* FROM Dropdown (All major cities visible) */}
                <label className="field">
                  <span className="field-label">From</span>
                  <select name="from" value={form.from} onChange={handleChange}>
                    {INDIAN_CITIES.map((city) => (
                      <option key={city} value={city} disabled={city === "Select Station"}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.from && <small className="field-error">{errors.from}</small>}
                </label>

                {/* TO Dropdown (All major cities visible) */}
                <label className="field">
                  <span className="field-label">To</span>
                  <select name="to" value={form.to} onChange={handleChange}>
                    {INDIAN_CITIES.map((city) => (
                      <option key={city} value={city} disabled={city === "Select Station"}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.to && <small className="field-error">{errors.to}</small>}
                </label>

                {/* Date, Passengers, Class fields (unchanged) */}
                <label className="field">
                  <span className="field-label">Journey Date</span>
                  <input type="date" name="date" value={form.date} onChange={handleChange} />
                  {errors.date && <small className="field-error">{errors.date}</small>}
                </label>

                <label className="field small">
                  <span className="field-label">Passengers</span>
                  <input type="number" min="1" name="passengers" value={form.passengers} onChange={handleChange} />
                </label>

                <label className="field">
                  <span className="field-label">Class</span>
                  <select name="class" value={form.class} onChange={handleChange}>
                    <option>Sleeper</option>
                    <option>AC 3 Tier</option>
                    <option>AC 2 Tier</option>
                    <option>AC First Class</option>
                    <option>Chair Car</option>
                  </select>
                </label>

                <div className="field actions">
                  <button type="submit" className="primary-btn" disabled={loading}>
                    {loading ? "Searching…" : "Search"}
                  </button>
                  <button type="button" className="link-btn" onClick={handleClear}>
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Offers, Why choose us, Partners sections (rest of the JSX) */}
        <section className="train-offers">
          <h3>Train Booking Offers</h3>
          <div className="offers-carousel">
            <div className="offer-card">
              <div className="offer-badge">20% OFF</div>
              <p>First Train Booking</p>
            </div>
            <div className="offer-card">
              <div className="offer-badge">Flat ₹200</div>
              <p>With SBI Credit Card</p>
            </div>
            <div className="offer-card">
              <div className="offer-badge">50% OFF</div>
              <p>Festive Rail Sale</p>
            </div>
          </div>
        </section>

        <section className="train-why">
          <h3>Why Book Trains With Us?</h3>
          <div className="why-grid">
            <div className="why-card">🚆 IRCTC Authorized Partner</div>
            <div className="why-card">💳 Secure Payments</div>
            <div className="why-card">⚡ Quick Confirmations</div>
            <div className="why-card">📞 24/7 Support</div>
            <div className="why-card">🔁 Easy Cancellations</div>
          </div>
        </section>

        <section className="train-partners">
          <h3>Railway Partners</h3>
          <div className="partners-grid">
            {["IRCTC", "South Central Railway", "Northern Railway", "Eastern Railway", "Western Railway"].map((p) => (
              <div key={p} className="partner">{p}</div>
            ))}
          </div>
        </section>
      </div> {/* End of trains-content-overlay */}
    </div>
  );
};

export default Trains;