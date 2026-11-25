import React, { useState } from "react";

const SAMPLE_ROUTES = [
  {
    id: 1,
    code: "RT-01",
    name: "Caticlan - Tabon / Proper",
    origin: "Caticlan Jetty Port",
    destination: "Tabon",
    stops: ["Caticlan Jetty Port", "Nabas Junction", "Union", "Tabon"],
    estDuration: "45 mins",
    fare: "₱65",
  },
  {
    id: 2,
    code: "RT-02",
    name: "Kalibo - Caticlan Highway",
    origin: "Kalibo Integrated Transport Terminal",
    destination: "Caticlan Jetty Port",
    stops: ["Kalibo Terminal", "Numancia", "Nabas", "Malay Proper", "Caticlan"],
    estDuration: "1 hr 30 mins",
    fare: "₱150",
  },
  {
    id: 3,
    code: "RT-03",
    name: "Nabas - Malay Highway Loop",
    origin: "Nabas Highway Stop",
    destination: "Malay Proper",
    stops: ["Nabas Highway Stop", "Aklan Boundary", "Malay Proper"],
    estDuration: "30 mins",
    fare: "₱40",
  },
];

export default function Routes() {
  const [searchStop, setSearchStop] = useState("");

  const filteredRoutes = SAMPLE_ROUTES.filter(
    (route) =>
      route.name.toLowerCase().includes(searchStop.toLowerCase()) ||
      route.stops.some((stop) =>
        stop.toLowerCase().includes(searchStop.toLowerCase())
      )
  );

  return (
    <div className="routes-page">
      <h2>SakayTime — Routes &amp; Route Stops</h2>

      <div className="routes-search">
        <input
          type="text"
          placeholder="Search route or stop (e.g., Nabas, Caticlan)..."
          aria-label="Search route or stop"
          value={searchStop}
          onChange={(e) => setSearchStop(e.target.value)}
        />
      </div>

      <div className="routes-table-wrap">
        <table className="routes-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Route Name</th>
              <th>Route Stops</th>
              <th>Est. Duration</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id}>
                <td>
                  <strong>{route.code}</strong>
                </td>
                <td>
                  <strong>{route.name}</strong>
                  <div className="routes-endpoints">
                    {route.origin} → {route.destination}
                  </div>
                </td>
                <td>{route.stops.join(" → ")}</td>
                <td>{route.estDuration}</td>
                <td>{route.fare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}