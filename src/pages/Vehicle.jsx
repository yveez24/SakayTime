import React, { useState } from "react";

const SAMPLE_VEHICLES = [
  {
    id: 1,
    unitCode: "Modern Jeepney #04",
    type: "Modern Jeepney",
    route: "Caticlan - Tabon / Proper",
    capacity: 24,
    status: "Active",
  },
  {
    id: 2,
    unitCode: "Van / UV Express #12",
    type: "UV Express Van",
    route: "Kalibo - Caticlan Highway",
    capacity: 14,
    status: "Boarding",
  },
  {
    id: 3,
    unitCode: "Modern Jeepney #09",
    type: "Modern Jeepney",
    route: "Nabas - Malay Highway Loop",
    capacity: 22,
    status: "Maintenance",
  },
];

export default function Vehicle() {
  const [selectedType, setSelectedType] = useState("All");

  const vehicleTypes = [
    "All",
    ...new Set(SAMPLE_VEHICLES.map((item) => item.type)),
  ];

  const filteredVehicles =
    selectedType === "All"
      ? SAMPLE_VEHICLES
      : SAMPLE_VEHICLES.filter((item) => item.type === selectedType);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>SakayTime — Vehicles</h2>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="vehicleTypeFilter" style={{ marginRight: "8px" }}>
          Filter by Type:
        </label>
        <select
          id="vehicleTypeFilter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Unit</th>
            <th>Vehicle Type</th>
            <th>Assigned Route</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>
                <strong>{vehicle.unitCode}</strong>
              </td>
              <td>{vehicle.type}</td>
              <td>{vehicle.route}</td>
              <td>{vehicle.capacity} seats</td>
              <td>{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}