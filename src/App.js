import React from 'react';
import StaffDashboard from './staff/StaffDashboard';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
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
        React.createElement('button', { className: 'nav-item active' }, React.createElement('span', { className: 'nav-icon' }, '◫'), 'Staff Dashboard'),
        React.createElement('button', { className: 'nav-item' }, React.createElement('span', { className: 'nav-icon' }, '⎈'), 'Assigned Routes'),
        React.createElement('button', { className: 'nav-item' }, React.createElement('span', { className: 'nav-icon' }, '⟡'), 'Trip Updates'),
        React.createElement('button', { className: 'nav-item' }, React.createElement('span', { className: 'nav-icon' }, '◌'), 'Announcements'),
        React.createElement('button', { className: 'nav-item' }, React.createElement('span', { className: 'nav-icon' }, '◐'), 'Logout')
      )
    ),
    React.createElement(
      'main',
      { className: 'workspace' },
      React.createElement(StaffDashboard),
      React.createElement(AdminDashboard)
    )
  );
}
