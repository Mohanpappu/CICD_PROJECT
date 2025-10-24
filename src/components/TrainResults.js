import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrainResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { results, searchParams } = location.state || { 
    results: [], 
    searchParams: { from: "Departure", to: "Destination", date: "N/A", class: "N/A" } 
  };

  const handleBookNow = (train) => {
    navigate("/train-book", { state: { train, searchParams } });
  };

  return (
    <>
      <style>
        {`
          body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; color: #111; }
          .trains-root { padding: 20px; width: 100%; margin: 0 auto; }
          .link-btn {
            background: none; border: none; color: #232f3e; font-weight: 600; cursor: pointer;
            font-size: 1rem; margin-bottom: 20px; transition: color 0.2s;
          }
          .link-btn:hover { color: #ff9900; text-decoration: underline; }
          .train-results h3 { color: #232f3e; font-size: 1.5rem; font-weight: 700; }
          .train-results p { color: #555555; font-size: 0.95rem; margin-bottom: 20px; }

          .results-grid { display: flex; flex-direction: column; gap: 20px; width: 100%; }

          .train-card {
            background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08); padding: 20px; width: 100%;
            transition: transform 0.2s, box-shadow 0.2s; text-align: left;
          }
          .train-card:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.1); }

          .train-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed #e5e7eb; padding-bottom: 10px; margin-bottom: 15px; }
          .train-name { font-size: 1.25rem; font-weight: 700; color: #232f3e; }
          .number { font-size: 0.85rem; font-weight: 500; color: #ff9900; background-color: #fff4e5; padding: 4px 8px; border-radius: 6px; border: 1px solid #ffcc80; }

          .train-details { display: flex; flex-direction: column; gap: 15px; }
          .route-info { display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; font-weight: 600; color: #111; }
          .time-info { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-top: 1px solid #e5e7eb; }
          .time-block { text-align: center; flex: 1; }
          .label { font-size: 0.75rem; color: #555; margin-bottom: 4px; }
          .time { font-size: 1.3rem; font-weight: 700; color: #ff9900; }

          .duration-block { display: flex; align-items: center; justify-content: center; flex: 1; }
          .duration { font-size: 0.85rem; font-weight: 500; color: #555; border: 1px solid #555; padding: 4px 10px; border-radius: 9999px; }

          .train-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; margin-top: 15px; border-top: 1px dashed #e5e7eb; }
          .class { background-color: #ffedd5; color: #ff9900; padding: 6px 10px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; }

          .price-and-book { display: flex; align-items: center; gap: 15px; }
          .price { font-size: 1.5rem; font-weight: 800; color: #ff9900; }
          .book-btn {
            background-color: #232f3e; color: white; border: none; padding: 10px 20px; border-radius: 8px;
            font-weight: 600; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s;
          }
          .book-btn:hover { background-color: #ff9900; color: #232f3e; box-shadow: 0 2px 5px rgba(255,153,0,0.5); }

          @media (max-width: 600px) {
            .train-card { padding: 15px; }
            .train-header { flex-direction: column; align-items: flex-start; gap: 5px; }
            .time-info { flex-wrap: wrap; justify-content: center; gap: 10px; }
            .time-block { flex: none; width: 45%; text-align: center; }
            .duration-block { order: -1; flex: 1 100%; margin-bottom: 10px; }
            .train-footer { flex-direction: column; align-items: flex-start; gap: 15px; }
            .price-and-book { width: 100%; justify-content: space-between; }
          }
        `}
      </style>

      <div className="trains-root">
        <button className="link-btn" onClick={() => navigate("/trains")}>
          ← Back to Search
        </button>

        <section className="train-results">
          <h3>Trains from {searchParams.from} to {searchParams.to}</h3>
          <p>Journey Date: {searchParams.date} | Class: {searchParams.class}</p>
          
          {results.length === 0 ? (
            <p style={{ color: "#ff9900", textAlign: "center", marginTop: "50px", fontWeight: "600" }}>
              No trains found for this route.
            </p>
          ) : (
            <div className="results-grid">
              {results.map((t) => (
                <div key={t.id} className="train-card">
                  <div className="train-header">
                    <h4 className="train-name">{t.name}</h4>
                    <span className="number">#{t.number}</span>
                  </div>
                  
                  <div className="train-details">
                    <div className="route-info">
                      <span>{t.from}</span> → <span>{t.to}</span>
                    </div>
                    <div className="time-info">
                      <div className="time-block">
                        <p className="label">Departure</p>
                        <p className="time">{t.departure}</p>
                      </div>
                      <div className="duration-block">
                        <p className="duration">{t.duration}</p>
                      </div>
                      <div className="time-block">
                        <p className="label">Arrival</p>
                        <p className="time">{t.arrival}</p>
                      </div>
                    </div>
                  </div>

                  <div className="train-footer">
                    <span className="class">{t.class}</span>
                    <div className="price-and-book">
                      <span className="price">{t.price}</span>
                      <button className="book-btn" onClick={() => handleBookNow(t)}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default TrainResults;
