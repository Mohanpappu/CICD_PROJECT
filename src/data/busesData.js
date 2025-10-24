export const generateBuses = (from, to, date) => {
  const buses = [];
  for (let i = 1; i <= 4; i++) { // 4 buses
    buses.push({
      id: i,
      operator: `Operator ${i}`,
      from,
      to,
      date,
      depart: `${8 + i}:00`,
      arrive: `${12 + i}:30`,
      duration: `${4 + i % 3}h ${30 + i % 30}m`,
      fare: 300 + i * 50,
      features: i % 2 === 0 ? ["AC", "Seater"] : ["Non-AC", "Sleeper"],
      seats: Array.from({ length: 36 }, (_, idx) => idx + 1)
    });
  }
  return buses;
};
