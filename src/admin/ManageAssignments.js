import React from 'react';

const starterAssignments = [
  { staff: 'R. Dela Cruz', route: 'Iloilo City → Passi', bus: 'Bus 08', shift: 'Morning', status: 'Assigned' },
  { staff: 'A. Santos', route: 'Iloilo City → Magsaysay', bus: 'Bus 09', shift: 'Morning', status: 'Assigned' },
  { staff: 'M. Rivera', route: 'Iloilo City → Pototan', bus: 'Bus 11', shift: 'Afternoon', status: 'Pending' },
];

export default function ManageAssignments() {
  const [assignments, setAssignments] = React.useState(starterAssignments);
  const [form, setForm] = React.useState({ staff: '', route: '', bus: '', shift: 'Morning', status: 'Assigned' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.staff.trim() || !form.route.trim() || !form.bus.trim()) {
      return;
    }

    setAssignments((current) => [{
      staff: form.staff.trim(),
      route: form.route.trim(),
      bus: form.bus.trim(),
      shift: form.shift,
      status: form.status,
    }, ...current]);

    setForm({ staff: '', route: '', bus: '', shift: 'Morning', status: 'Assigned' });
  };

  return React.createElement(
    'section',
    { className: 'page-panel' },
    React.createElement('h3', { className: 'page-title' }, 'Assignment Management'),
    React.createElement(
      'form',
      { onSubmit: handleSubmit },
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement(
          'div',
          { className: 'field-block' },
          React.createElement('label', null, 'Staff'),
          React.createElement('input', { type: 'text', name: 'staff', value: form.staff, onChange: handleChange, placeholder: 'Assigned driver' })
        ),
        React.createElement(
          'div',
          { className: 'field-block' },
          React.createElement('label', null, 'Route'),
          React.createElement('input', { type: 'text', name: 'route', value: form.route, onChange: handleChange, placeholder: 'Route name' })
        )
      ),
      React.createElement(
        'div',
        { className: 'route-pair' },
        React.createElement(
          'div',
          { className: 'field-block' },
          React.createElement('label', null, 'Bus'),
          React.createElement('input', { type: 'text', name: 'bus', value: form.bus, onChange: handleChange, placeholder: 'Bus number' })
        ),
        React.createElement(
          'div',
          { className: 'field-block' },
          React.createElement('label', null, 'Shift'),
          React.createElement(
            'select',
            { name: 'shift', value: form.shift, onChange: handleChange },
            React.createElement('option', null, 'Morning'),
            React.createElement('option', null, 'Afternoon'),
            React.createElement('option', null, 'Night')
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'field-block' },
        React.createElement('label', null, 'Status'),
        React.createElement(
          'select',
          { name: 'status', value: form.status, onChange: handleChange },
          React.createElement('option', null, 'Assigned'),
          React.createElement('option', null, 'Pending'),
          React.createElement('option', null, 'On break')
        )
      ),
      React.createElement('button', { type: 'submit', className: 'primary-button' }, 'Add Assignment')
    ),
    React.createElement(
      'div',
      { className: 'compact-list', style: { marginTop: 18 } },
      assignments.map((assignment) =>
        React.createElement(
          'div',
          { key: `${assignment.staff}-${assignment.route}`, className: 'route-card' },
          React.createElement(
            'div',
            { className: 'route-head' },
            React.createElement('strong', null, assignment.staff),
            React.createElement(
              'span',
              { className: assignment.status === 'Assigned' ? 'badge ok' : assignment.status === 'Pending' ? 'badge neutral' : 'badge warn' },
              assignment.status
            )
          ),
          React.createElement(
            'div',
            { className: 'meta-grid' },
            React.createElement('span', null, assignment.route),
            React.createElement('span', null, assignment.bus),
            React.createElement('span', null, assignment.shift)
          )
        )
      )
    )
  );
}
