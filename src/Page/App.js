import React from 'react';
import StaffDashboard from './staff/StaffDashboard';
import AssignedRoutes from './staff/AssignedRoutes';
import TripUpdates from './staff/TripUpdates';
import AdminDashboard from './admin/AdminDashboard';
import ManageAnnouncements from './admin/ManageAnnouncements';

const navItems = [
  { label: 'Staff Dashboard', icon: '◫' },
  { label: 'Assigned Routes', icon: '⎈' },
  { label: 'Trip Updates', icon: '⟡' },
  { label: 'Announcements', icon: '◌' },
  { label: 'Logout', icon: '◐' },
];

export default function App() {
  const [activeView, setActiveView] = React.useState('Staff Dashboard');

  const renderMainContent = () => {
    if (activeView === 'Assigned Routes') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(AssignedRoutes)));
    }

    if (activeView === 'Trip Updates') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(TripUpdates)));
    }

    if (activeView === 'Announcements') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageAnnouncements)));
    }

    if (activeView === 'Logout') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement('section', { className: 'panel' }, React.createElement('h3', { className: 'page-title' }, 'Logged out'))));
    }

    return React.createElement(
      'main',
      { className: 'workspace' },
      React.createElement(StaffDashboard),
      React.createElement(AdminDashboard)
    );
  };

  return React.createElement(
    'div',
    { className: 'shell' },
    React.createElement(
      'aside',
      { className: 'sidebar' },
      React.createElement(
        'div',
        { className: 'brand-block' },
        React.createElement('div', { className: 'bus-mark' }, '🚌'),
        React.createElement('div', { className: 'brand-name' }, 'SakayTime')
      ),
      React.createElement(
        'nav',
        { className: 'nav' },
        navItems.map((item) =>
          React.createElement(
            'button',
            {
              key: item.label,
              className: `nav-item ${activeView === item.label ? 'active' : ''}`,
              onClick: () => setActiveView(item.label),
              type: 'button',
            },
            React.createElement('span', { className: 'nav-icon' }, item.icon),
            item.label
          )
        )
      )
    ),
    renderMainContent()
  );
}
