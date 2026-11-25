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
  return React.createElement(
    'section',
    { className: 'panel panel-staff' },
    React.createElement(
      'header',
      { className: 'panel-header' },
      React.createElement('div', null,
        React.createElement('div', { className: 'eyebrow' }, 'Staff'),
        React.createElement('h2', null, 'Staff Dashboard')
      ),
      React.createElement('button', { className: 'header-pill' }, 'Staff ▾')
    ),
    React.createElement(
      'div',
      { className: 'stats-grid' },
      staffStats.map((item) =>
        React.createElement(
          'div',
          { key: item.label, className: 'metric-card' },
          React.createElement('div', { className: `dot dot-${item.tone}` }),
          React.createElement('div', { className: 'metric-label' }, item.label),
          React.createElement('div', { className: 'metric-value' }, item.value)
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'content-row' },
      React.createElement(
        'div',
        { className: 'form-card' },
        React.createElement('div', { className: 'mini-title' }, 'Submit Trip Update'),
        React.createElement(
          'div',
          { className: 'field-line' },
          React.createElement('label', null, 'Update Type:'),
          React.createElement(
            'select',
            { defaultValue: 'Delay' },
            React.createElement('option', null, 'Delay'),
            React.createElement('option', null, 'Route Change'),
            React.createElement('option', null, 'Maintenance')
          )
        ),
        React.createElement(
          'div',
          { className: 'route-pair' },
          React.createElement(
            'div',
            { className: 'field-block' },
            React.createElement('label', null, 'Route'),
            React.createElement(
              'select',
              { defaultValue: 'Iloilo City → Passi' },
              React.createElement('option', null, 'Iloilo City → Passi'),
              React.createElement('option', null, 'Iloilo City → Magsaysay')
            )
          ),
          React.createElement(
            'div',
            { className: 'field-block' },
            React.createElement('label', null, 'Bus'),
            React.createElement(
              'select',
              { defaultValue: 'Bus 08' },
              React.createElement('option', null, 'Bus 08'),
              React.createElement('option', null, 'Bus 09')
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'field-block' },
          React.createElement('label', null, 'Details'),
          React.createElement('textarea', { placeholder: 'Enter details...' })
        ),
        React.createElement('button', { className: 'primary-button' }, 'Submit Update')
      ),
      React.createElement(
        'div',
        { className: 'table-card' },
        React.createElement('div', { className: 'mini-title' }, 'Your Routes'),
        React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Route'),
              React.createElement('th', null, 'Bus'),
              React.createElement('th', null, 'Next Departure'),
              React.createElement('th', null, 'Status')
            )
          ),
          React.createElement(
            'tbody',
            null,
            routeRows.map((row) =>
              React.createElement('tr', { key: row.route },
                React.createElement('td', null, row.route),
                React.createElement('td', null, row.bus),
                React.createElement('td', null, row.departure),
                React.createElement('td', null, React.createElement('span', { className: 'status-pill' }, row.status))
              )
            )
          )
        )
      )
    )
  );
}
