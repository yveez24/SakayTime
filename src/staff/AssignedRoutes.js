import React from 'react';

const assignedRoutes = [
  { route: 'Iloilo City → Passi', bus: 'Bus 08', time: '08:00 AM', driver: 'R. Dela Cruz', status: 'On Time' },
  { route: 'Iloilo City → Magsaysay', bus: 'Bus 09', time: '09:00 AM', driver: 'A. Santos', status: 'On Time' },
  { route: 'Iloilo City → Pototan', bus: 'Bus 11', time: '10:30 AM', driver: 'M. Rivera', status: 'Delayed 10 min' },
];

export default function AssignedRoutes() {
  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Assigned Routes'),
    React.createElement(
      'div',
      { className: 'compact-list' },
      assignedRoutes.map((item) =>
        React.createElement(
          'div',
          { key: item.route, className: 'route-card' },
          React.createElement('div', { className: 'route-head' },
            React.createElement('strong', null, item.route),
            React.createElement('span', { className: item.status === 'On Time' ? 'badge ok' : 'badge warn' }, item.status)
          ),
          React.createElement('div', { className: 'meta-grid' },
            React.createElement('span', null, 'Bus: ' + item.bus),
            React.createElement('span', null, 'Departure: ' + item.time),
            React.createElement('span', null, 'Driver: ' + item.driver)
          )
        )
      )
    )
  );
}
