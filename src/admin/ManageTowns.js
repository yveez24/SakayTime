import React from 'react';

const starterTowns = [
  { town: 'Iloilo City', province: 'Iloilo', routes: 8 },
  { town: 'Passi', province: 'Iloilo', routes: 4 },
  { town: 'Pototan', province: 'Iloilo', routes: 3 },
];

export default function ManageTowns() {
  const [towns, setTowns] = React.useState(starterTowns);
  const [form, setForm] = React.useState({ town: '', province: '', routes: 1 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'routes' ? Number(value) : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.town.trim() || !form.province.trim()) {
      return;
    }

    setTowns((current) => [{ town: form.town.trim(), province: form.province.trim(), routes: form.routes || 1 }, ...current]);
    setForm({ town: '', province: '', routes: 1 });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Town Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Town'), React.createElement('input', { type: 'text', name: 'town', value: form.town, onChange: handleChange, placeholder: 'Town name' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Province'), React.createElement('input', { type: 'text', name: 'province', value: form.province, onChange: handleChange, placeholder: 'Province' }))
      ),
      React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Routes Served'), React.createElement('input', { type: 'number', min: '1', name: 'routes', value: form.routes, onChange: handleChange })),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Town')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      towns.map((town) =>
        React.createElement(
          'div',
          { key: `${town.town}-${town.province}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, town.town),
            React.createElement('span', { className: 'badge ok' }, `${town.routes} routes`)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, town.province),
            React.createElement('span', null, 'Town'),
            React.createElement('span', null, 'Coverage')
          )
        )
      )
    )
  );
}
