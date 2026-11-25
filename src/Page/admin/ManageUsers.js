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

  return (
    <section className="page-panel">
      <h3 className="page-title">User Management</h3>

      <form onSubmit={handleSubmit}>
        <div className="route-pair">
          <div className="field-block">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
          </div>

          <div className="field-block">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" />
          </div>
        </div>

        <div className="route-pair">
          <div className="field-block">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option>Dispatcher</option>
              <option>Driver</option>
              <option>Admin</option>
              <option>Staff</option>
            </select>
          </div>

          <div className="field-block">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>On duty</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button">Add User</button>
      </form>

      <div className="compact-list" style={{ marginTop: 18 }}>
        {users.map((user) => (
          <div key={`${user.email}-${user.name}`} className="route-card">
            <div className="route-head">
              <strong>{user.name}</strong>
              <span className={user.status === 'Active' || user.status === 'On duty' ? 'badge ok' : 'badge neutral'}>{user.status}</span>
            </div>
            <div className="meta-grid">
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>Account</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
