import React from 'react';
import StaffDashboard from '../staff/StaffDashboard';
import AssignedRoutes from '../staff/AssignedRoutes';
import TripUpdates from '../staff/TripUpdates';
import AdminDashboard from '../admin/AdminDashboard';
import ManageAnnouncements from '../admin/ManageAnnouncements';
import ManageUsers from '../admin/ManageUsers';
import ManageRoutes from '../admin/ManageRoutes';
import ManageSchedules from '../admin/ManageSchedules';
import ManageAssignments from '../admin/ManageAssignments';
import ManageTerminals from '../admin/ManageTerminals';
import ManageTowns from '../admin/ManageTowns';
import ManageVehicles from '../admin/ManageVehicles';

const navItems = [
  { label: 'Staff Dashboard', icon: 'â—«' },
  { label: 'Assigned Routes', icon: 'âŽˆ' },
  { label: 'Trip Updates', icon: 'âŸ¡' },
  { label: 'Announcements', icon: 'â—Œ' },
  { label: 'User Management', icon: 'ðŸ‘¤' },
  { label: 'Route Management', icon: 'ðŸ›£' },
  { label: 'Schedule Management', icon: 'ðŸ—“' },
  { label: 'Assignment Management', icon: 'ðŸ“‹' },
  { label: 'Terminal Management', icon: 'ðŸ¢' },
  { label: 'Town Management', icon: 'ðŸ˜' },
  { label: 'Vehicle Management', icon: 'ðŸš' },
  { label: 'Logout', icon: 'â—' },
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

    if (activeView === 'User Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageUsers)));
    }

    if (activeView === 'Route Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageRoutes)));
    }

    if (activeView === 'Schedule Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageSchedules)));
    }

    if (activeView === 'Assignment Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageAssignments)));
    }

    if (activeView === 'Terminal Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageTerminals)));
    }

    if (activeView === 'Town Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageTowns)));
    }

    if (activeView === 'Vehicle Management') {
      return React.createElement('main', { className: 'workspace' }, React.createElement('div', { style: { width: '100%' } }, React.createElement(ManageVehicles)));
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
        React.createElement('div', { className: 'bus-mark' }, 'ðŸšŒ'),
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

