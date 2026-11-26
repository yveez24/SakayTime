import React from 'react';

const starterAssignments = [
  { staff: 'R. Dela Cruz', route: 'Iloilo City → Passi', bus: 'Bus 08', shift: 'Morning', status: 'Assigned' },
  { staff: 'A. Santos', route: 'Iloilo City → Oton', bus: 'Bus 09', shift: 'Morning', status: 'Assigned' },
  { staff: 'M. Rivera', route: 'Iloilo City → Miago', bus: 'Bus 11', shift: 'Afternoon', status: 'Pending' },
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

    setAssignments((current) => [{ staff: form.staff.trim(), route: form.route.trim(), bus: form.bus.trim(), shift: form.shift, status: form.status }, ...current]);
    setForm({ staff: '', route: '', bus: '', shift: 'Morning', status: 'Assigned' });
  };

  return (
    <section className="page-panel">
      <h3 className="page-title">Assignment Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Staff</label>
            <input type="text" name="staff" value={form.staff} onChange={handleChange} placeholder="Assigned driver" />
          </div>

          <div className="field-block">
            <label>Route</label>
            <input type="text" name="route" value={form.route} onChange={handleChange} placeholder="Route name" />
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Bus</label>
            <input type="text" name="bus" value={form.bus} onChange={handleChange} placeholder="Bus number" />
          </div>

          <div className="field-block">
            <label>Shift</label>
            <select name="shift" value={form.shift} onChange={handleChange}>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Night</option>
            </select>
          </div>
        </div>

        <div className="field-block">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Assigned</option>
            <option>Pending</option>
            <option>On break</option>
          </select>
        </div>

        <button type="submit" className="primary-button">Add Assignment</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {assignments.map((assignment) => (
          <div key={`${assignment.staff}-${assignment.route}`} className="route-card">
            <div className="route-head">
              <strong>{assignment.staff}</strong>
              <span className={assignment.status === 'Assigned' ? 'badge ok' : assignment.status === 'Pending' ? 'badge neutral' : 'badge warn'}>{assignment.status}</span>
            </div>
            <div className="meta-grid">
              <span>{assignment.route}</span>
              <span>{assignment.bus}</span>
              <span>{assignment.shift}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
