import React from 'react';

const starterAnnouncements = [
  { title: 'Rain Advisory', audience: 'All passengers', date: 'Jun 12, 2026', status: 'Published' },
  { title: 'Holiday Schedule', audience: 'City routes', date: 'Jun 10, 2026', status: 'Scheduled' },
  { title: 'Bus Maintenance Notice', audience: 'Drivers', date: 'Jun 07, 2026', status: 'Published' },
];

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = React.useState(starterAnnouncements);
  const [form, setForm] = React.useState({
    title: '',
    audience: 'All passengers',
    date: '',
    status: 'Published',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.date) {
      return;
    }

    setAnnouncements((current) => [
      { title: form.title.trim(), audience: form.audience, date: new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), status: form.status },
      ...current,
    ]);

    setForm({ title: '', audience: 'All passengers', date: '', status: 'Published' });
  };

  return (
    <section className="page-panel">
      <h3 className="page-title">Announcements</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter announcement title" />
          </div>

          <div className="field-block">
            <label>Audience</label>
            <select name="audience" value={form.audience} onChange={handleChange}>
              <option>All passengers</option>
              <option>City routes</option>
              <option>Drivers</option>
              <option>Dispatch team</option>
            </select>
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </div>

          <div className="field-block">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Published</option>
              <option>Scheduled</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button">Add Announcement</button>
      </form>

      <div className="announcement-list" style={{ marginTop: 18 }}>
        {announcements.map((item) => (
          <div key={`${item.title}-${item.date}`} className="announcement-card">
            <div className="row-between">
              <strong>{item.title}</strong>
              <span className={item.status === 'Published' ? 'badge ok' : item.status === 'Scheduled' ? 'badge neutral' : 'badge warn'}>{item.status}</span>
            </div>
            <p className="muted">{item.audience}</p>
            <small className="muted">{item.date}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
