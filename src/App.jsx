import React from 'react'

const staffNav = [
  'Staff Dashboard',
  'Assigned Routes',
  'Trip Updates',
  'Announcements',
  'Logout',
]

const staffStats = [
  { label: 'Assigned Routes', value: 2, tone: 'blue' },
  { label: 'Pending Updates', value: 1, tone: 'orange' },
  { label: 'Reported Delays', value: 0, tone: 'red' },
  { label: 'Latest Announcements', value: 2, tone: 'green' },
]

const routeRows = [
  { route: 'Iloilo City → Passi', bus: 'Bus 08', departure: '08:00 AM', status: 'On Time' },
  { route: 'Iloilo City → Magsaysay', bus: 'Bus 09', departure: '09:00 AM', status: 'On Time' },
]

const adminNav = [
  'Admin Dashboard',
  'User Management',
  'Route Management',
  'Schedule Management',
  'Vehicle Management',
  'Announcements Management',
  'Reports',
  'Logout',
]

const adminStats = [
  { label: 'Total Users', value: '120', tone: 'blue' },
  { label: 'Total Routes', value: '5', tone: 'sky' },
  { label: 'Total Schedules', value: '36', tone: 'orange' },
  { label: 'Announcements', value: '3', tone: 'green' },
]

const activity = [
  { type: 'success', text: 'New user registered: maria@test.com', time: '2h ago' },
  { type: 'warning', text: 'Trip update: Bus delayed (Iloilo City → Passi)', time: '1h ago' },
  { type: 'info', text: 'New announcement: “Rain Advisory”', time: '4h ago' },
]

const summary = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 48 },
  { month: 'Jun', value: 42 },
]

function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="bus-mark">
            <span className="bus-icon">🚌</span>
          </div>
          <div>
            <div className="brand-name">SakayTime</div>
          </div>
        </div>

        <nav className="nav">
          {staffNav.map((item, index) => (
            <button key={item} className={`nav-item ${index === 0 ? 'active' : ''}`}>
              <span className="nav-icon">{iconFor(item)}</span>
              <span>{item}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="workspace">
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
                <textarea placeholder="Enter details..." defaultValue="" />
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
                      <td><span className="status-pill on-time">{row.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="panel panel-admin">
          <header className="panel-header admin-header">
            <div>
              <div className="eyebrow">Admin</div>
              <h2>Admin Dashboard</h2>
            </div>
            <button className="header-pill admin-pill">Admin ▾</button>
          </header>

          <div className="stats-grid admin-stats">
            {adminStats.map((item) => (
              <div key={item.label} className="metric-card admin-metric">
                <div className={`dot dot-${item.tone}`} />
                <div className="metric-label">{item.label}</div>
                <div className="metric-value">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="admin-bottom">
            <div className="chart-card">
              <div className="mini-title split-title">
                <span>System Overview</span>
              </div>
              <div className="chart-wrap">
                <div className="grid-lines" />
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
      </main>
    </div>
  )
}

function iconFor(item) {
  const icons = {
    'Staff Dashboard': '◫',
    'Assigned Routes': '⎈',
    'Trip Updates': '⟡',
    'Announcements': '◌',
    'Logout': '◐',
  }

  return icons[item] || '•'
}

export default App
