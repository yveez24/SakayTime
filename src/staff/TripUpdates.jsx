import React from 'react';

const updates = [
  { route: 'Iloilo City → Passi', type: 'Delay', detail: 'Traffic congestion near Dingle. Expected 15-minute delay.', time: '2 hours ago' },
  { route: 'Iloilo City → Oton', type: 'Maintenance', detail: 'Vehicle inspection completed; route continuing as scheduled.', time: '5 hours ago' },
  { route: 'Iloilo City → Miago', type: 'Change', detail: 'Temporary route diversion due to road closure.', time: 'Yesterday' },
];

export default function TripUpdates() {
  return (
    <section className="page-panel">
      <h3 className="page-title">Trip Updates</h3>
      <div className="update-list">
        {updates.map((item) => (
          <div key={item.route} className="update-card">
            <div className="update-top">
              <strong>{item.route}</strong>
              <span className="tag">{item.type}</span>
            </div>
            <p className="update-detail">{item.detail}</p>
            <small className="muted">{item.time}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
