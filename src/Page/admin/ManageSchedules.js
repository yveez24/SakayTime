import React from 'react';

const starterSchedules = [
  { route: 'Iloilo City → Passi', departure: '08:00 AM', arrival: '09:30 AM', status: 'On Time' },
  { route: 'Iloilo City → Magsaysay', departure: '09:00 AM', arrival: '10:15 AM', status: 'On Time' },
  { route: 'Iloilo City → Pototan', departure: '10:30 AM', arrival: '11:20 AM', status: 'Delayed' },
];

export default function ManageSchedules() {
  const [schedules, setSchedules] = React.useState(starterSchedules);
  const [form, setForm] = React.useState({ route: '', departure: '', arrival: '', status: 'On Time' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.route.trim() || !form.departure.trim() || !form.arrival.trim()) {
      return;
    }

    setSchedules((current) => [{ route: form.route.trim(), departure: form.departure.trim(), arrival: form.arrival.trim(), status: form.status }, ...current]);
    setForm({ route: '', departure: '', arrival: '', status: 'On Time' });
  };

  return (
    <section className="page-panel">
      <h3 className="page-title">Schedule Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Route</label>
            <input type="text" name="route" value={form.route} onChange={handleChange} placeholder="Route name" />
          </div>

          <div className="field-block">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>On Time</option>
              <option>Delayed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Departure</label>
            <input type="text" name="departure" value={form.departure} onChange={handleChange} placeholder="08:00 AM" />
          </div>

          <div className="field-block">
            <label>Arrival</label>
            <input type="text" name="arrival" value={form.arrival} onChange={handleChange} placeholder="09:30 AM" />
          </div>
        </div>

        <button type="submit" className="primary-button">Add Schedule</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {schedules.map((schedule) => (
          <div key={`${schedule.route}-${schedule.departure}`} className="route-card">
            <div className="route-head">
              <strong>{schedule.route}</strong>
              <span className={schedule.status === 'On Time' ? 'badge ok' : schedule.status === 'Delayed' ? 'badge warn' : 'badge neutral'}>{schedule.status}</span>
            </div>
            <div className="meta-grid">
              <span>Departure: {schedule.departure}</span>
              <span>Arrival: {schedule.arrival}</span>
              <span>Schedule</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
