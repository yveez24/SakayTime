import React, { useState } from "react";

const SAMPLE_TERMINALS = [
  {
    id: 1,
    name: "Caticlan Jetty Port Terminal",
    town: "Malay",
    operatingHours: "4:30 AM - 10:00 PM",
    activeRoutes: 3,
    status: "Open",
  },
  {
    id: 2,
    name: "Kalibo Integrated Transport Terminal",
    town: "Kalibo",
    operatingHours: "4:00 AM - 9:30 PM",
    activeRoutes: 5,
    status: "Open",
  },
  {
    id: 3,
    name: "Nabas Highway Stop Terminal",
    town: "Nabas",
    operatingHours: "5:00 AM - 8:00 PM",
    activeRoutes: 2,
    status: "Limited",
  },
];

export default function Terminal() {
  const [selectedTown, setSelectedTown] = useState("All");

  const towns = ["All", ...new Set(SAMPLE_TERMINALS.map((item) => item.town))];

  const filteredTerminals =
    selectedTown === "All"
      ? SAMPLE_TERMINALS
      : SAMPLE_TERMINALS.filter((item) => item.town === selectedTown);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>SakayTime — Terminals</h2>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="terminalTownFilter" style={{ marginRight: "8px" }}>
          Filter by Town:
        </label>
        <select
          id="terminalTownFilter"
          value={selectedTown}
          onChange={(e) => setSelectedTown(e.target.value)}
        >
          {towns.map((town) => (
            <option key={town} value={town}>
              {town}
            </option>
          ))}
        </select>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Terminal Name</th>
            <th>Town</th>
            <th>Operating Hours</th>
            <th>Active Routes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTerminals.map((terminal) => (
            <tr key={terminal.id}>
              <td>
                <strong>{terminal.name}</strong>
              </td>
              <td>{terminal.town}</td>
              <td>{terminal.operatingHours}</td>
              <td>{terminal.activeRoutes}</td>
              <td>{terminal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}