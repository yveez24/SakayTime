import React from 'react';

const starterTerminals = [
  { name: 'Iloilo City Terminal', town: 'Iloilo City', status: 'Active' },
  { name: 'Passi Terminal', town: 'Passi', status: 'Active' },
  { name: 'Oton Terminal', town: 'Oton', status: 'Active' },
  { name: 'Miago Terminal', town: 'Miago', status: 'Maintenance' },
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

  return (
    <section className="page-panel">
      <h3 className="page-title">Terminal Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Terminal Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Terminal name" />
          </div>

          <div className="field-block">
            <label>Town</label>
            <input type="text" name="town" value={form.town} onChange={handleChange} placeholder="Town" />
          </div>
        </div>

        <div className="field-block">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Closed</option>
          </select>
        </div>

        <button type="submit" className="primary-button">Add Terminal</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {terminals.map((terminal) => (
          <div key={`${terminal.name}-${terminal.town}`} className="route-card">
            <div className="route-head">
              <strong>{terminal.name}</strong>
              <span className={terminal.status === 'Active' ? 'badge ok' : terminal.status === 'Maintenance' ? 'badge warn' : 'badge neutral'}>{terminal.status}</span>
            </div>
            <div className="meta-grid">
              <span>{terminal.town}</span>
              <span>Terminal</span>
              <span>Operations</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
