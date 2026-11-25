import React, { useState } from "react";

const SAMPLE_TOWNS = [
  {
    id: 1,
    name: "Malay",
    province: "Aklan",
    terminalsCount: 2,
    activeRoutes: 4,
    notes: "Gateway to Boracay via Caticlan Jetty Port",
  },
  {
    id: 2,
    name: "Kalibo",
    province: "Aklan",
    terminalsCount: 2,
    activeRoutes: 5,
    notes: "Provincial capital and main transport hub",
  },
  {
    id: 3,
    name: "Nabas",
    province: "Aklan",
    terminalsCount: 1,
    activeRoutes: 3,
    notes: "Along main highway between Kalibo and Malay",
  },
];

export default function Towns() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTowns = SAMPLE_TOWNS.filter(
    (town) =>
      town.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      town.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>SakayTime — Towns</h2>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search town or province..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px 10px", width: "260px" }}
        />
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Town</th>
            <th>Province</th>
            <th>Terminals</th>
            <th>Active Routes</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredTowns.map((town) => (
            <tr key={town.id}>
              <td>
                <strong>{town.name}</strong>
              </td>
              <td>{town.province}</td>
              <td>{town.terminalsCount}</td>
              <td>{town.activeRoutes}</td>
              <td>{town.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}