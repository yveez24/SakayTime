import React from 'react';

const adminStats = [
  { label: 'Total Users', value: '120', tone: 'blue' },
  { label: 'Total Routes', value: '5', tone: 'sky' },
  { label: 'Total Schedules', value: '36', tone: 'orange' },
  { label: 'Announcements', value: '3', tone: 'green' },
];

const summary = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 48 },
  { month: 'Jun', value: 42 },
];

const activity = [
  { type: 'success', text: 'New user registered: maria@test.com', time: '2h ago' },
  { type: 'warning', text: 'Trip update: Bus delayed (Iloilo City → Passi)', time: '1h ago' },
  { type: 'info', text: 'New announcement: “Rain Advisory”', time: '4h ago' },
];

export default function AdminDashboard() {
  return React.createElement(
    'section',
    { className: 'panel panel-admin' },
    React.createElement(
      'header',
      { className: 'panel-header' },
      React.createElement('div', null,
        React.createElement('div', { className: 'eyebrow' }, 'Admin'),
        React.createElement('h2', null, 'Admin Dashboard')
      ),
      React.createElement('button', { className: 'header-pill' }, 'Admin ▾')
    ),
    React.createElement(
      'div',
      { className: 'stats-grid' },
      adminStats.map((item) =>
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
      { className: 'admin-bottom' },
      React.createElement(
        'div',
        { className: 'chart-card' },
        React.createElement('div', { className: 'mini-title' }, 'System Overview'),
        React.createElement(
          'div',
          { className: 'chart-wrap' },
          React.createElement(
            'div',
            { className: 'chart-bars' },
            summary.map(({ month, value }) =>
              React.createElement(
                'div',
                { key: month, className: 'bar-group' },
                React.createElement('div', { className: 'bar', style: { height: `${value}%` } }),
                React.createElement('span', null, month)
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'activity-card' },
        React.createElement('div', { className: 'mini-title' }, 'Recent Activity'),
        React.createElement(
          'ul',
          { className: 'activity-list' },
          activity.map((item) =>
            React.createElement(
              'li',
              { key: item.text, className: `activity-item ${item.type}` },
              React.createElement('span', { className: 'activity-bullet' }),
              React.createElement('div', { className: 'activity-text' }, item.text),
              React.createElement('span', { className: 'activity-time' }, item.time)
            )
          )
        )
      )
    )
  );
}
