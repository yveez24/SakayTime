import React from 'react';

const assignedRoutes = [
  { route: 'Iloilo City → Passi', bus: 'Bus 08', time: '08:00 AM', driver: 'R. Dela Cruz', status: 'On Time' },
  { route: 'Iloilo City → Oton', bus: 'Bus 09', time: '09:00 AM', driver: 'A. Santos', status: 'On Time' },
  { route: 'Iloilo City → Miago', bus: 'Bus 11', time: '10:30 AM', driver: 'M. Rivera', status: 'Delayed 10 min' },
];

export default function AssignedRoutes() {
  return (
    <section className="page-panel">
      <h3 className="page-title">Assigned Routes</h3>
      <div className="compact-list">
        {assignedRoutes.map((item) => (
          <div key={item.route} className="route-card">
            <div className="route-head">
              <strong>{item.route}</strong>
              <span className={item.status === 'On Time' ? 'badge ok' : 'badge warn'}>{item.status}</span>
            </div>
            <div className="meta-grid">
              <span>Bus: {item.bus}</span>
              <span>Departure: {item.time}</span>
              <span>Driver: {item.driver}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
