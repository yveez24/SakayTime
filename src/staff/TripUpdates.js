import React from 'react';

const updates = [
  { route: 'Iloilo City → Passi', type: 'Delay', detail: 'Traffic congestion near Dingle. Expected 15-minute delay.', time: '2 hours ago' },
  { route: 'Iloilo City → Magsaysay', type: 'Maintenance', detail: 'Vehicle inspection completed; route continuing as scheduled.', time: '5 hours ago' },
  { route: 'Iloilo City → Pototan', type: 'Change', detail: 'Temporary route diversion due to road closure.', time: 'Yesterday' },
];

export default function TripUpdates() {
  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Trip Updates'),
    React.createElement(
      'div',
      { className: 'update-list' },
      updates.map((item) =>
        React.createElement(
          'div',
          { key: item.route, className: 'update-card' },
          React.createElement('div', { className: 'update-top' },
            React.createElement('strong', null, item.route),
            React.createElement('span', { className: 'tag' }, item.type)
          ),
          React.createElement('p', { className: 'update-detail' }, item.detail),
          React.createElement('small', { className: 'muted' }, item.time)
        )
      )
    )
  );
}
