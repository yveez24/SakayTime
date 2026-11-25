import React from 'react';

const starterVehicles = [
  { plate: 'ABC-123', type: 'Mini bus', route: 'Iloilo City → Passi', status: 'Ready' },
  { plate: 'XYZ-456', type: 'Bus', route: 'Iloilo City → Magsaysay', status: 'In service' },
  { plate: 'LMN-789', type: 'Bus', route: 'Iloilo City → Pototan', status: 'Maintenance' },
];

export default function ManageVehicles() {
  const [vehicles, setVehicles] = React.useState(starterVehicles);
  const [form, setForm] = React.useState({ plate: '', type: 'Bus', route: '', status: 'Ready' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.plate.trim() || !form.route.trim()) {
      return;
    }

    setVehicles((current) => [{ plate: form.plate.trim(), type: form.type, route: form.route.trim(), status: form.status }, ...current]);
    setForm({ plate: '', type: 'Bus', route: '', status: 'Ready' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Vehicle Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Plate Number'), React.createElement('input', { type: 'text', name: 'plate', value: form.plate, onChange: handleChange, placeholder: 'ABC-123' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Type'), React.createElement('select', { name: 'type', value: form.type, onChange: handleChange }, React.createElement('option', null, 'Bus'), React.createElement('option', null, 'Mini bus'), React.createElement('option', null, 'Van')))
      ),
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Assigned Route'), React.createElement('input', { type: 'text', name: 'route', value: form.route, onChange: handleChange, placeholder: 'Route name' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Status'), React.createElement('select', { name: 'status', value: form.status, onChange: handleChange }, React.createElement('option', null, 'Ready'), React.createElement('option', null, 'In service'), React.createElement('option', null, 'Maintenance')))
      ),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Vehicle')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      vehicles.map((vehicle) =>
        React.createElement(
          'div',
          { key: `${vehicle.plate}-${vehicle.route}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, vehicle.plate),
            React.createElement('span', { className: vehicle.status === 'Ready' || vehicle.status === 'In service' ? 'badge ok' : 'badge warn' }, vehicle.status)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, vehicle.type),
            React.createElement('span', null, vehicle.route),
            React.createElement('span', null, 'Vehicle')
          )
        )
      )
    )
  );
}
