import React from 'react';

import StaffDashboard from './staff/StaffDashboard';
import AssignedRoutes from './staff/AssignedRoutes';
import TripUpdates from './staff/TripUpdates';
import AdminDashboard from './Page/admin/AdminDashboard';
import ManageAnnouncements from './Page/admin/ManageAnnouncements';
import ManageUsers from './Page/admin/ManageUsers';
import ManageRoutes from './Page/admin/ManageRoutes';
import ManageSchedules from './Page/admin/ManageSchedules';
import ManageAssignments from './Page/admin/ManageAssignments';
import ManageTerminals from './Page/admin/ManageTerminals';
import ManageTowns from './Page/admin/ManageTowns';
import ManageVehicles from './Page/admin/ManageVehicles';

const navItems = [
  { label: 'Staff Dashboard', icon: '◫' },
  { label: 'Assigned Routes', icon: '⎈' },
  { label: 'Trip Updates', icon: '⟡' },
  { label: 'Announcements', icon: '◌' },
  { label: 'User Management', icon: '👤' },
  { label: 'Route Management', icon: '🛣' },
  { label: 'Schedule Management', icon: '🗓' },
  { label: 'Assignment Management', icon: '📋' },
  { label: 'Terminal Management', icon: '🏢' },
  { label: 'Town Management', icon: '🏘' },
  { label: 'Vehicle Management', icon: '🚍' },
];

export default function App() {
  const [activeView, setActiveView] = React.useState('Staff Dashboard');

  const renderMainContent = () => {
    const views = {
      'Assigned Routes': <AssignedRoutes />,
      'Trip Updates': <TripUpdates />,
      'Announcements': <ManageAnnouncements />,
      'User Management': <ManageUsers />,
      'Route Management': <ManageRoutes />,
      'Schedule Management': <ManageSchedules />,
      'Assignment Management': <ManageAssignments />,
      'Terminal Management': <ManageTerminals />,
      'Town Management': <ManageTowns />,
      'Vehicle Management': <ManageVehicles />,
    };

    if (views[activeView]) {
      return (
        <main className="workspace">
          <div style={{ width: '100%' }}>{views[activeView]}</div>
        </main>
      );
    }

    return (
      <main className="workspace">
        <StaffDashboard />
        <AdminDashboard />
      </main>
    );
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="bus-mark">🚌</div>
          <div className="brand-name">SakayTime</div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${activeView === item.label ? 'active' : ''}`}
              onClick={() => setActiveView(item.label)}
              type="button"
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {renderMainContent()}
    </div>
  );
}
