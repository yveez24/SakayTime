import React from 'react';

const starterTerminals = [
  { name: 'Iloilo City Terminal', town: 'Iloilo City', status: 'Active' },
  { name: 'Passi Terminal', town: 'Passi', status: 'Active' },
  { name: 'Pototan Terminal', town: 'Pototan', status: 'Maintenance' },
];

export default function ManageTerminals() {
  const [terminals, setTerminals] = React.useState(starterTerminals);
  const [form, setForm] = React.useState({ name: '', town: '', status: 'Active' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.town.trim()) {
      return;
    }

    setTerminals((current) => [{ name: form.name.trim(), town: form.town.trim(), status: form.status }, ...current]);
    setForm({ name: '', town: '', status: 'Active' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Terminal Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Terminal Name'), React.createElement('input', { type: 'text', name: 'name', value: form.name, onChange: handleChange, placeholder: 'Terminal name' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Town'), React.createElement('input', { type: 'text', name: 'town', value: form.town, onChange: handleChange, placeholder: 'Town' }))
      ),
      React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Status'), React.createElement('select', { name: 'status', value: form.status, onChange: handleChange }, React.createElement('option', null, 'Active'), React.createElement('option', null, 'Maintenance'), React.createElement('option', null, 'Closed'))),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Terminal')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      terminals.map((terminal) =>
        React.createElement(
          'div',
          { key: `${terminal.name}-${terminal.town}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, terminal.name),
            React.createElement('span', { className: terminal.status === 'Active' ? 'badge ok' : terminal.status === 'Maintenance' ? 'badge warn' : 'badge neutral' }, terminal.status)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, terminal.town),
            React.createElement('span', null, 'Terminal'),
            React.createElement('span', null, 'Operations')
          )
        )
      )
    )
  );
}
