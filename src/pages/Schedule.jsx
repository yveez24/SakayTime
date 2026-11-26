import React, { useState } from "react";

const SAMPLE_SCHEDULES = [
  {
    id: 1,
    town: "Malay",
    terminal: "Caticlan Jetty Port Terminal",
    route: "Caticlan - Tabon / Proper",
    stops: ["Jetty Port", "Nabas Junction", "Tabon"],
    vehicle: "Modern Jeepney #04",
    departureTime: "11:00 AM",
    waitingTime: "10 mins",
    status: "On Time",
  },
  {
    id: 2,
    town: "Kalibo",
    terminal: "Kalibo Integrated Transport Terminal",
    route: "Kalibo - Caticlan Highway",
    stops: ["Kalibo Proper", "Numancia", "Nabas", "Caticlan"],
    vehicle: "Van / UV Express #12",
    departureTime: "11:20 AM",
    waitingTime: "15 mins",
    status: "Boarding",
  },
];

export default function Schedule() {
  const [selectedTown, setSelectedTown] = useState("All");

  const towns = ["All", ...new Set(SAMPLE_SCHEDULES.map((item) => item.town))];

  const filteredSchedules =
    selectedTown === "All"
      ? SAMPLE_SCHEDULES
      : SAMPLE_SCHEDULES.filter((item) => item.town === selectedTown);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>SakayTime — Schedule</h2>

      <div style={{ marginBottom: "16px" }}>
?
        <label htmlFor="townFilter" style={{ marginRight: "8px" }}>Town:</label>
        <select id="townFilter" value={selectedTown} onChange={(e) => setSelectedTown(e.target.value)}>
          {towns.map((town) => <option key={town} value={town}>{town}</option>)}
        </select>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Town</th>
            <th>Terminal</th>
            <th>Route & Stops</th>
            <th>Vehicle</th>
            <th>Departure</th>
            <th>Est. Waiting</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.map((sched) => (
            <tr key={sched.id}>
              <td>{sched.town}</td>
              <td>{sched.terminal}</td>
              <td>
                <strong>{sched.route}</strong>
                <div style={{ fontSize: "12px", color: "#555" }}>
                  Stops: {sched.stops.join(" → ")}
                </div>
              </td>
              <td>{sched.vehicle}</td>
              <td>{sched.departureTime}</td>
              <td>{sched.waitingTime}</td>
              <td>{sched.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}