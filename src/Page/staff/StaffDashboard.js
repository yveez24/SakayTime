import React from 'react';

const staffStats = [
  { label: 'Assigned Routes', value: 2, tone: 'blue' },
  { label: 'Pending Updates', value: 1, tone: 'orange' },
  { label: 'Reported Delays', value: 0, tone: 'red' },
  { label: 'Latest Announcements', value: 2, tone: 'green' },
];

const routeRows = [
  { route: 'Iloilo City → Passi', bus: 'Bus 08', departure: '08:00 AM', status: 'On Time' },
  { route: 'Iloilo City → Magsaysay', bus: 'Bus 09', departure: '09:00 AM', status: 'On Time' },
];

export default function StaffDashboard() {
  return (
    <section className="panel panel-staff">
      <header className="panel-header">
        <div>
          <div className="eyebrow">Staff</div>
          <h2>Staff Dashboard</h2>
        </div>
        <button className="header-pill">Staff ▾</button>
      </header>

      <div className="stats-grid">
        {staffStats.map((item) => (
          <div key={item.label} className="metric-card">
            <div className={`dot dot-${item.tone}`} />
            <div className="metric-label">{item.label}</div>
            <div className="metric-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="content-row">
        <div className="form-card">
          <div className="mini-title">Submit Trip Update</div>

          <div className="field-line">
            <label>Update Type:</label>
            <select defaultValue="Delay">
              <option>Delay</option>
              <option>Route Change</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div className="route-pair">
            <div className="field-block">
              <label>Route</label>
              <select defaultValue="Iloilo City → Passi">
                <option>Iloilo City → Passi</option>
                <option>Iloilo City → Magsaysay</option>
              </select>
            </div>

            <div className="field-block">
              <label>Bus</label>
              <select defaultValue="Bus 08">
                <option>Bus 08</option>
                <option>Bus 09</option>
              </select>
            </div>
          </div>

          <div className="field-block">
            <label>Details</label>
            <textarea placeholder="Enter details..." />
          </div>

          <button className="primary-button">Submit Update</button>
        </div>

        <div className="table-card">
          <div className="mini-title">Your Routes</div>
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>Bus</th>
                <th>Next Departure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {routeRows.map((row) => (
                <tr key={row.route}>
                  <td>{row.route}</td>
                  <td>{row.bus}</td>
                  <td>{row.departure}</td>
                  <td><span className="status-pill">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
