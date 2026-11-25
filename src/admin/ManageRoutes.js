import React from 'react';

const starterRoutes = [
  { name: 'Iloilo City → Passi', origin: 'Iloilo City', destination: 'Passi City', status: 'Active' },
  { name: 'Iloilo City → Magsaysay', origin: 'Iloilo City', destination: 'Magsaysay', status: 'Active' },
  { name: 'Iloilo City → Pototan', origin: 'Iloilo City', destination: 'Pototan', status: 'Pending' },
];

export default function ManageRoutes() {
  const [routes, setRoutes] = React.useState(starterRoutes);
  const [form, setForm] = React.useState({ name: '', origin: '', destination: '', status: 'Active' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.origin.trim() || !form.destination.trim()) {
      return;
    }

    setRoutes((current) => [{ name: form.name.trim(), origin: form.origin.trim(), destination: form.destination.trim(), status: form.status }, ...current]);
    setForm({ name: '', origin: '', destination: '', status: 'Active' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Route Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Route Name'), React.createElement('input', { type: 'text', name: 'name', value: form.name, onChange: handleChange, placeholder: 'e.g. Iloilo City → San Joaquin' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Status'), React.createElement('select', { name: 'status', value: form.status, onChange: handleChange }, React.createElement('option', null, 'Active'), React.createElement('option', null, 'Pending'), React.createElement('option', null, 'Maintenance')))
      ),
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Origin'), React.createElement('input', { type: 'text', name: 'origin', value: form.origin, onChange: handleChange, placeholder: 'Origin' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Destination'), React.createElement('input', { type: 'text', name: 'destination', value: form.destination, onChange: handleChange, placeholder: 'Destination' }))
      ),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Route')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      routes.map((route) =>
        React.createElement(
          'div',
          { key: `${route.name}-${route.origin}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, route.name),
            React.createElement('span', { className: route.status === 'Active' ? 'badge ok' : route.status === 'Pending' ? 'badge neutral' : 'badge warn' }, route.status)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, `From: ${route.origin}`),
            React.createElement('span', null, `To: ${route.destination}`),
            React.createElement('span', null, 'Route')
          )
        )
      )
    )
  );
}
