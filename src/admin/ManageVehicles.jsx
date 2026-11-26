import React from 'react';

const starterVehicles = [
  { plate: 'ABC-123', type: 'Mini bus', route: 'Iloilo City → Passi', status: 'Ready' },
  { plate: 'XYZ-456', type: 'Bus', route: 'Iloilo City → Oton', status: 'In service' },
  { plate: 'LMN-789', type: 'Bus', route: 'Iloilo City → Miago', status: 'Maintenance' },
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

  return (
    <section className="page-panel">
      <h3 className="page-title">Vehicle Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Plate Number</label>
            <input type="text" name="plate" value={form.plate} onChange={handleChange} placeholder="ABC-123" />
          </div>

          <div className="field-block">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Bus</option>
              <option>Mini bus</option>
              <option>Van</option>
            </select>
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Assigned Route</label>
            <input type="text" name="route" value={form.route} onChange={handleChange} placeholder="Route name" />
          </div>

          <div className="field-block">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Ready</option>
              <option>In service</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button">Add Vehicle</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {vehicles.map((vehicle) => (
          <div key={`${vehicle.plate}-${vehicle.route}`} className="route-card">
            <div className="route-head">
              <strong>{vehicle.plate}</strong>
              <span className={vehicle.status === 'Ready' || vehicle.status === 'In service' ? 'badge ok' : 'badge warn'}>{vehicle.status}</span>
            </div>
            <div className="meta-grid">
              <span>{vehicle.type}</span>
              <span>{vehicle.route}</span>
              <span>Vehicle</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
