import React from 'react';

const starterSchedules = [
  { route: 'Iloilo City → Passi', departure: '08:00 AM', arrival: '09:30 AM', status: 'On Time' },
  { route: 'Iloilo City → Magsaysay', departure: '09:00 AM', arrival: '10:15 AM', status: 'On Time' },
  { route: 'Iloilo City → Pototan', departure: '10:30 AM', arrival: '11:20 AM', status: 'Delayed' },
];

export default function ManageSchedules() {
  const [schedules, setSchedules] = React.useState(starterSchedules);
  const [form, setForm] = React.useState({ route: '', departure: '', arrival: '', status: 'On Time' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.route.trim() || !form.departure.trim() || !form.arrival.trim()) {
      return;
    }

    setSchedules((current) => [{ route: form.route.trim(), departure: form.departure.trim(), arrival: form.arrival.trim(), status: form.status }, ...current]);
    setForm({ route: '', departure: '', arrival: '', status: 'On Time' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Schedule Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Route'), React.createElement('input', { type: 'text', name: 'route', value: form.route, onChange: handleChange, placeholder: 'Route name' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Status'), React.createElement('select', { name: 'status', value: form.status, onChange: handleChange }, React.createElement('option', null, 'On Time'), React.createElement('option', null, 'Delayed'), React.createElement('option', null, 'Cancelled')))
      ),
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Departure'), React.createElement('input', { type: 'text', name: 'departure', value: form.departure, onChange: handleChange, placeholder: '08:00 AM' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Arrival'), React.createElement('input', { type: 'text', name: 'arrival', value: form.arrival, onChange: handleChange, placeholder: '09:30 AM' }))
      ),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Schedule')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      schedules.map((schedule) =>
        React.createElement(
          'div',
          { key: `${schedule.route}-${schedule.departure}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, schedule.route),
            React.createElement('span', { className: schedule.status === 'On Time' ? 'badge ok' : schedule.status === 'Delayed' ? 'badge warn' : 'badge neutral' }, schedule.status)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, `Departure: ${schedule.departure}`),
            React.createElement('span', null, `Arrival: ${schedule.arrival}`),
            React.createElement('span', null, 'Schedule')
          )
        )
      )
    )
  );
}
