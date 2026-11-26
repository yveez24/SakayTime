import React from 'react';

const starterTowns = [
  { town: 'Iloilo City', province: 'Iloilo', routes: 8 },
  { town: 'Passi', province: 'Iloilo', routes: 4 },
  { town: 'Oton', province: 'Iloilo', routes: 3 },
  { town: 'Miago', province: 'Iloilo', routes: 2 },
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

  return (
    <section className="page-panel">
      <h3 className="page-title">Town Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Town</label>
            <input type="text" name="town" value={form.town} onChange={handleChange} placeholder="Town name" />
          </div>

          <div className="field-block">
            <label>Province</label>
            <input type="text" name="province" value={form.province} onChange={handleChange} placeholder="Province" />
          </div>
        </div>

        <div className="field-block">
          <label>Routes Served</label>
          <input type="number" min="1" name="routes" value={form.routes} onChange={handleChange} />
        </div>

        <button type="submit" className="primary-button">Add Town</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {towns.map((town) => (
          <div key={`${town.town}-${town.province}`} className="route-card">
            <div className="route-head">
              <strong>{town.town}</strong>
              <span className="badge ok">{town.routes} routes</span>
            </div>
            <div className="meta-grid">
              <span>{town.province}</span>
              <span>Town</span>
              <span>Coverage</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
