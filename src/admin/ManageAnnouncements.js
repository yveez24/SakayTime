import React from 'react';

const announcements = [
  { title: 'Rain Advisory', audience: 'All passengers', date: 'Jun 12, 2026', status: 'Published' },
  { title: 'Holiday Schedule', audience: 'City routes', date: 'Jun 10, 2026', status: 'Scheduled' },
  { title: 'Bus Maintenance Notice', audience: 'Drivers', date: 'Jun 07, 2026', status: 'Published' },
];

export default function ManageAnnouncements() {
  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Announcements'),
    React.createElement(
      'div',
      { className: 'announcement-list' },
      announcements.map((item) =>
        React.createElement(
          'div',
          { key: item.title, className: 'announcement-card' },
          React.createElement('div', { className: 'row-between' },
            React.createElement('strong', null, item.title),
            React.createElement('span', { className: item.status === 'Published' ? 'badge ok' : 'badge neutral' }, item.status)
          ),
          React.createElement('p', { className: 'muted' }, item.audience),
          React.createElement('small', { className: 'muted' }, item.date)
        )
      )
    )
  );
}
