import React from 'react';

const adminStats = [
  { label: 'Total Users', value: '120', tone: 'blue' },
  { label: 'Total Routes', value: '5', tone: 'sky' },
  { label: 'Total Schedules', value: '36', tone: 'orange' },
  { label: 'Announcements', value: '3', tone: 'green' },
];

const summary = [
  { month: 'Jan', value: 20 }, { month: 'Feb', value: 28 },
  { month: 'Mar', value: 24 }, { month: 'Apr', value: 35 },
  { month: 'May', value: 48 }, { month: 'Jun', value: 42 },
];

const activity = [
  { type: 'success', text: 'New user registered: maria@test.com', time: '2h ago' },
  { type: 'warning', text: 'Trip update: Bus delayed (Iloilo City → Passi)', time: '1h ago' },
  { type: 'info', text: 'New announcement: “Rain Advisory”', time: '4h ago' },
];

export default function AdminDashboard() {
  return (
    <section className="panel panel-admin">
      <header className="panel-header">
        <div><div className="eyebrow">Admin</div><h2>Admin Dashboard</h2></div>
        <button className="header-pill">Admin ▾</button>
      </header>

      <div className="stats-grid">
        {adminStats.map((item) => (
          <div key={item.label} className="metric-card">
            <div className={`dot dot-${item.tone}`} />
            <div className="metric-label">{item.label}</div>
            <div className="metric-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-bottom">
        <div className="chart-card">
          <div className="mini-title">System Overview</div>
          <div className="chart-wrap">
            <div className="chart-bars">
              {summary.map(({ month, value }) => (
                <div key={month} className="bar-group">
                  <div className="bar" style={{ height: `${value}%` }} />
                  <span>{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="activity-card">
          <div className="mini-title">Recent Activity</div>
          <ul className="activity-list">
            {activity.map((item) => (
              <li key={item.text} className={`activity-item ${item.type}`}>
                <span className="activity-bullet" />
                <div className="activity-text">{item.text}</div>
                <span className="activity-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
