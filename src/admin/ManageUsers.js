import React from 'react';

const starterUsers = [
  { name: 'Maria Dela Cruz', email: 'maria@sakaytime.com', role: 'Dispatcher', status: 'Active' },
  { name: 'Jose Santos', email: 'jose@sakaytime.com', role: 'Driver', status: 'On duty' },
  { name: 'Anna Rivera', email: 'anna@sakaytime.com', role: 'Admin', status: 'Active' },
];

export default function ManageUsers() {
  const [users, setUsers] = React.useState(starterUsers);
  const [form, setForm] = React.useState({ name: '', email: '', role: 'Dispatcher', status: 'Active' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    setUsers((current) => [{ name: form.name.trim(), email: form.email.trim(), role: form.role, status: form.status }, ...current]);
    setForm({ name: '', email: '', role: 'Dispatcher', status: 'Active' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'User Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Name'), React.createElement('input', { type: 'text', name: 'name', value: form.name, onChange: handleChange, placeholder: 'Full name' })),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Email'), React.createElement('input', { type: 'email', name: 'email', value: form.email, onChange: handleChange, placeholder: 'Email address' }))
      ),
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Role'), React.createElement('select', { name: 'role', value: form.role, onChange: handleChange }, React.createElement('option', null, 'Dispatcher'), React.createElement('option', null, 'Driver'), React.createElement('option', null, 'Admin'), React.createElement('option', null, 'Staff'))),
        React.createElement('div', { className: 'field-block' }, React.createElement('label', null, 'Status'), React.createElement('select', { name: 'status', value: form.status, onChange: handleChange }, React.createElement('option', null, 'Active'), React.createElement('option', null, 'On duty'), React.createElement('option', null, 'Inactive')))
      ),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add User')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      users.map((user) =>
        React.createElement(
          'div',
          { key: `${user.email}-${user.name}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, user.name),
            React.createElement('span', { className: user.status === 'Active' || user.status === 'On duty' ? 'badge ok' : 'badge neutral' }, user.status)
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, user.email),
            React.createElement('span', null, user.role),
            React.createElement('span', null, 'Account')
          )
        )
      )
    )
  );
}
