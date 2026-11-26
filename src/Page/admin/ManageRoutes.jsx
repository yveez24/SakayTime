import React from 'react';

const starterRoutes = [
  { name: 'Iloilo City → Passi', origin: 'Iloilo City', destination: 'Passi', status: 'Active' },
  { name: 'Iloilo City → Oton', origin: 'Iloilo City', destination: 'Oton', status: 'Active' },
  { name: 'Iloilo City → Miago', origin: 'Iloilo City', destination: 'Miago', status: 'Pending' },
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

  return (
    <section className="page-panel">
      <h3 className="page-title">Route Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Route Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Iloilo City → San Joaquin" />
          </div>

          <div className="field-block">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Pending</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Origin</label>
            <input type="text" name="origin" value={form.origin} onChange={handleChange} placeholder="Origin" />
          </div>

          <div className="field-block">
            <label>Destination</label>
            <input type="text" name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" />
          </div>
        </div>

        <button type="submit" className="primary-button">Add Route</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {routes.map((route) => (
          <div key={`${route.name}-${route.origin}`} className="route-card">
            <div className="route-head">
              <strong>{route.name}</strong>
              <span className={route.status === 'Active' ? 'badge ok' : route.status === 'Pending' ? 'badge neutral' : 'badge warn'}>{route.status}</span>
            </div>
            <div className="meta-grid">
              <span>From: {route.origin}</span>
              <span>To: {route.destination}</span>
              <span>Route</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
