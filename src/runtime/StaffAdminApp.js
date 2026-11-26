// src/pages/StaffAdminApp.jsx
import React13 from "react";

// src/staff/StaffDashboard.jsx
import React from "react";
var staffStats = [
  { label: "Assigned Routes", value: 2, tone: "blue" },
  { label: "Pending Updates", value: 1, tone: "orange" },
  { label: "Reported Delays", value: 0, tone: "red" },
  { label: "Latest Announcements", value: 2, tone: "green" }
];
var routeRows = [
  { route: "Iloilo City \u2192 Passi", bus: "Bus 08", departure: "08:00 AM", status: "On Time" },
  { route: "Iloilo City \u2192 Oton", bus: "Bus 09", departure: "09:00 AM", status: "On Time" }
];
function StaffDashboard() {
  return /* @__PURE__ */ React.createElement("section", { className: "panel panel-staff" }, /* @__PURE__ */ React.createElement("header", { className: "panel-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "Staff"), /* @__PURE__ */ React.createElement("h2", null, "Staff Dashboard")), /* @__PURE__ */ React.createElement("button", { className: "header-pill" }, "Staff \u25BE")), /* @__PURE__ */ React.createElement("div", { className: "stats-grid" }, staffStats.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.label, className: "metric-card" }, /* @__PURE__ */ React.createElement("div", { className: `dot dot-${item.tone}` }), /* @__PURE__ */ React.createElement("div", { className: "metric-label" }, item.label), /* @__PURE__ */ React.createElement("div", { className: "metric-value" }, item.value)))), /* @__PURE__ */ React.createElement("div", { className: "content-row" }, /* @__PURE__ */ React.createElement("div", { className: "form-card" }, /* @__PURE__ */ React.createElement("div", { className: "mini-title" }, "Submit Trip Update"), /* @__PURE__ */ React.createElement("div", { className: "field-line" }, /* @__PURE__ */ React.createElement("label", null, "Update Type:"), /* @__PURE__ */ React.createElement("select", { defaultValue: "Delay" }, /* @__PURE__ */ React.createElement("option", null, "Delay"), /* @__PURE__ */ React.createElement("option", null, "Route Change"), /* @__PURE__ */ React.createElement("option", null, "Maintenance"))), /* @__PURE__ */ React.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React.createElement("div", { className: "field-block" }, /* @__PURE__ */ React.createElement("label", null, "Route"), /* @__PURE__ */ React.createElement("select", { defaultValue: "Iloilo City \u2192 Passi" }, /* @__PURE__ */ React.createElement("option", null, "Iloilo City \u2192 Passi"), /* @__PURE__ */ React.createElement("option", null, "Iloilo City \u2192 Oton"))), /* @__PURE__ */ React.createElement("div", { className: "field-block" }, /* @__PURE__ */ React.createElement("label", null, "Bus"), /* @__PURE__ */ React.createElement("select", { defaultValue: "Bus 08" }, /* @__PURE__ */ React.createElement("option", null, "Bus 08"), /* @__PURE__ */ React.createElement("option", null, "Bus 09")))), /* @__PURE__ */ React.createElement("div", { className: "field-block" }, /* @__PURE__ */ React.createElement("label", null, "Details"), /* @__PURE__ */ React.createElement("textarea", { placeholder: "Enter details..." })), /* @__PURE__ */ React.createElement("button", { className: "primary-button" }, "Submit Update")), /* @__PURE__ */ React.createElement("div", { className: "table-card" }, /* @__PURE__ */ React.createElement("div", { className: "mini-title" }, "Your Routes"), /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Route"), /* @__PURE__ */ React.createElement("th", null, "Bus"), /* @__PURE__ */ React.createElement("th", null, "Next Departure"), /* @__PURE__ */ React.createElement("th", null, "Status"))), /* @__PURE__ */ React.createElement("tbody", null, routeRows.map((row) => /* @__PURE__ */ React.createElement("tr", { key: row.route }, /* @__PURE__ */ React.createElement("td", null, row.route), /* @__PURE__ */ React.createElement("td", null, row.bus), /* @__PURE__ */ React.createElement("td", null, row.departure), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "status-pill" }, row.status)))))))));
}

// src/staff/AssignedRoutes.jsx
import React2 from "react";
var assignedRoutes = [
  { route: "Iloilo City \u2192 Passi", bus: "Bus 08", time: "08:00 AM", driver: "R. Dela Cruz", status: "On Time" },
  { route: "Iloilo City \u2192 Oton", bus: "Bus 09", time: "09:00 AM", driver: "A. Santos", status: "On Time" },
  { route: "Iloilo City \u2192 Miago", bus: "Bus 11", time: "10:30 AM", driver: "M. Rivera", status: "Delayed 10 min" }
];
function AssignedRoutes() {
  return /* @__PURE__ */ React2.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React2.createElement("h3", { className: "page-title" }, "Assigned Routes"), /* @__PURE__ */ React2.createElement("div", { className: "compact-list" }, assignedRoutes.map((item) => /* @__PURE__ */ React2.createElement("div", { key: item.route, className: "route-card" }, /* @__PURE__ */ React2.createElement("div", { className: "route-head" }, /* @__PURE__ */ React2.createElement("strong", null, item.route), /* @__PURE__ */ React2.createElement("span", { className: item.status === "On Time" ? "badge ok" : "badge warn" }, item.status)), /* @__PURE__ */ React2.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React2.createElement("span", null, "Bus: ", item.bus), /* @__PURE__ */ React2.createElement("span", null, "Departure: ", item.time), /* @__PURE__ */ React2.createElement("span", null, "Driver: ", item.driver))))));
}

// src/staff/TripUpdates.jsx
import React3 from "react";
var updates = [
  { route: "Iloilo City \u2192 Passi", type: "Delay", detail: "Traffic congestion near Dingle. Expected 15-minute delay.", time: "2 hours ago" },
  { route: "Iloilo City \u2192 Oton", type: "Maintenance", detail: "Vehicle inspection completed; route continuing as scheduled.", time: "5 hours ago" },
  { route: "Iloilo City \u2192 Miago", type: "Change", detail: "Temporary route diversion due to road closure.", time: "Yesterday" }
];
function TripUpdates() {
  return /* @__PURE__ */ React3.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React3.createElement("h3", { className: "page-title" }, "Trip Updates"), /* @__PURE__ */ React3.createElement("div", { className: "update-list" }, updates.map((item) => /* @__PURE__ */ React3.createElement("div", { key: item.route, className: "update-card" }, /* @__PURE__ */ React3.createElement("div", { className: "update-top" }, /* @__PURE__ */ React3.createElement("strong", null, item.route), /* @__PURE__ */ React3.createElement("span", { className: "tag" }, item.type)), /* @__PURE__ */ React3.createElement("p", { className: "update-detail" }, item.detail), /* @__PURE__ */ React3.createElement("small", { className: "muted" }, item.time)))));
}

// src/admin/AdminDashboard.jsx
import React4 from "react";
var adminStats = [
  { label: "Total Users", value: "120", tone: "blue" },
  { label: "Total Routes", value: "5", tone: "sky" },
  { label: "Total Schedules", value: "36", tone: "orange" },
  { label: "Announcements", value: "3", tone: "green" }
];
var summary = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 28 },
  { month: "Mar", value: 24 },
  { month: "Apr", value: 35 },
  { month: "May", value: 48 },
  { month: "Jun", value: 42 }
];
var activity = [
  { type: "success", text: "New user registered: maria@test.com", time: "2h ago" },
  { type: "warning", text: "Trip update: Bus delayed (Iloilo City \u2192 Passi)", time: "1h ago" },
  { type: "info", text: "New announcement: \u201CRain Advisory\u201D", time: "4h ago" }
];
function AdminDashboard() {
  return /* @__PURE__ */ React4.createElement("section", { className: "panel panel-admin" }, /* @__PURE__ */ React4.createElement("header", { className: "panel-header" }, /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("div", { className: "eyebrow" }, "Admin"), /* @__PURE__ */ React4.createElement("h2", null, "Admin Dashboard")), /* @__PURE__ */ React4.createElement("button", { className: "header-pill" }, "Admin \u25BE")), /* @__PURE__ */ React4.createElement("div", { className: "stats-grid" }, adminStats.map((item) => /* @__PURE__ */ React4.createElement("div", { key: item.label, className: "metric-card" }, /* @__PURE__ */ React4.createElement("div", { className: `dot dot-${item.tone}` }), /* @__PURE__ */ React4.createElement("div", { className: "metric-label" }, item.label), /* @__PURE__ */ React4.createElement("div", { className: "metric-value" }, item.value)))), /* @__PURE__ */ React4.createElement("div", { className: "admin-bottom" }, /* @__PURE__ */ React4.createElement("div", { className: "chart-card" }, /* @__PURE__ */ React4.createElement("div", { className: "mini-title" }, "System Overview"), /* @__PURE__ */ React4.createElement("div", { className: "chart-wrap" }, /* @__PURE__ */ React4.createElement("div", { className: "chart-bars" }, summary.map(({ month, value }) => /* @__PURE__ */ React4.createElement("div", { key: month, className: "bar-group" }, /* @__PURE__ */ React4.createElement("div", { className: "bar", style: { height: `${value}%` } }), /* @__PURE__ */ React4.createElement("span", null, month)))))), /* @__PURE__ */ React4.createElement("div", { className: "activity-card" }, /* @__PURE__ */ React4.createElement("div", { className: "mini-title" }, "Recent Activity"), /* @__PURE__ */ React4.createElement("ul", { className: "activity-list" }, activity.map((item) => /* @__PURE__ */ React4.createElement("li", { key: item.text, className: `activity-item ${item.type}` }, /* @__PURE__ */ React4.createElement("span", { className: "activity-bullet" }), /* @__PURE__ */ React4.createElement("div", { className: "activity-text" }, item.text), /* @__PURE__ */ React4.createElement("span", { className: "activity-time" }, item.time)))))));
}

// src/admin/ManageAnnouncements.jsx
import React5 from "react";
var starterAnnouncements = [
  { title: "Rain Advisory", audience: "All passengers", date: "Jun 12, 2026", status: "Published" },
  { title: "Holiday Schedule", audience: "City routes", date: "Jun 10, 2026", status: "Scheduled" },
  { title: "Bus Maintenance Notice", audience: "Drivers", date: "Jun 07, 2026", status: "Published" }
];
function ManageAnnouncements() {
  const [announcements, setAnnouncements] = React5.useState(starterAnnouncements);
  const [form, setForm] = React5.useState({
    title: "",
    audience: "All passengers",
    date: "",
    status: "Published"
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
      { title: form.title.trim(), audience: form.audience, date: new Date(form.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), status: form.status },
      ...current
    ]);
    setForm({ title: "", audience: "All passengers", date: "", status: "Published" });
  };
  return /* @__PURE__ */ React5.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React5.createElement("h3", { className: "page-title" }, "Announcements"), /* @__PURE__ */ React5.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React5.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React5.createElement("div", { className: "field-block" }, /* @__PURE__ */ React5.createElement("label", null, "Title"), /* @__PURE__ */ React5.createElement("input", { type: "text", name: "title", value: form.title, onChange: handleChange, placeholder: "Enter announcement title" })), /* @__PURE__ */ React5.createElement("div", { className: "field-block" }, /* @__PURE__ */ React5.createElement("label", null, "Audience"), /* @__PURE__ */ React5.createElement("select", { name: "audience", value: form.audience, onChange: handleChange }, /* @__PURE__ */ React5.createElement("option", null, "All passengers"), /* @__PURE__ */ React5.createElement("option", null, "City routes"), /* @__PURE__ */ React5.createElement("option", null, "Drivers"), /* @__PURE__ */ React5.createElement("option", null, "Dispatch team")))), /* @__PURE__ */ React5.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React5.createElement("div", { className: "field-block" }, /* @__PURE__ */ React5.createElement("label", null, "Date"), /* @__PURE__ */ React5.createElement("input", { type: "date", name: "date", value: form.date, onChange: handleChange })), /* @__PURE__ */ React5.createElement("div", { className: "field-block" }, /* @__PURE__ */ React5.createElement("label", null, "Status"), /* @__PURE__ */ React5.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React5.createElement("option", null, "Published"), /* @__PURE__ */ React5.createElement("option", null, "Scheduled"), /* @__PURE__ */ React5.createElement("option", null, "Draft")))), /* @__PURE__ */ React5.createElement("button", { type: "submit", className: "primary-button" }, "Add Announcement")), /* @__PURE__ */ React5.createElement("div", { className: "announcement-list", style: { marginTop: 18 } }, announcements.map((item) => /* @__PURE__ */ React5.createElement("div", { key: `${item.title}-${item.date}`, className: "announcement-card" }, /* @__PURE__ */ React5.createElement("div", { className: "row-between" }, /* @__PURE__ */ React5.createElement("strong", null, item.title), /* @__PURE__ */ React5.createElement("span", { className: item.status === "Published" ? "badge ok" : item.status === "Scheduled" ? "badge neutral" : "badge warn" }, item.status)), /* @__PURE__ */ React5.createElement("p", { className: "muted" }, item.audience), /* @__PURE__ */ React5.createElement("small", { className: "muted" }, item.date)))));
}

// src/admin/ManageUsers.jsx
import React6 from "react";
var starterUsers = [
  { name: "Maria Dela Cruz", email: "maria@sakaytime.com", role: "Dispatcher", status: "Active" },
  { name: "Jose Santos", email: "jose@sakaytime.com", role: "Driver", status: "On duty" },
  { name: "Anna Rivera", email: "anna@sakaytime.com", role: "Admin", status: "Active" }
];
function ManageUsers() {
  const [users, setUsers] = React6.useState(starterUsers);
  const [form, setForm] = React6.useState({ name: "", email: "", role: "Dispatcher", status: "Active" });
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
    setForm({ name: "", email: "", role: "Dispatcher", status: "Active" });
  };
  return /* @__PURE__ */ React6.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React6.createElement("h3", { className: "page-title" }, "User Management"), /* @__PURE__ */ React6.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React6.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React6.createElement("div", { className: "field-block" }, /* @__PURE__ */ React6.createElement("label", null, "Name"), /* @__PURE__ */ React6.createElement("input", { type: "text", name: "name", value: form.name, onChange: handleChange, placeholder: "Full name" })), /* @__PURE__ */ React6.createElement("div", { className: "field-block" }, /* @__PURE__ */ React6.createElement("label", null, "Email"), /* @__PURE__ */ React6.createElement("input", { type: "email", name: "email", value: form.email, onChange: handleChange, placeholder: "Email address" }))), /* @__PURE__ */ React6.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React6.createElement("div", { className: "field-block" }, /* @__PURE__ */ React6.createElement("label", null, "Role"), /* @__PURE__ */ React6.createElement("select", { name: "role", value: form.role, onChange: handleChange }, /* @__PURE__ */ React6.createElement("option", null, "Dispatcher"), /* @__PURE__ */ React6.createElement("option", null, "Driver"), /* @__PURE__ */ React6.createElement("option", null, "Admin"), /* @__PURE__ */ React6.createElement("option", null, "Staff"))), /* @__PURE__ */ React6.createElement("div", { className: "field-block" }, /* @__PURE__ */ React6.createElement("label", null, "Status"), /* @__PURE__ */ React6.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React6.createElement("option", null, "Active"), /* @__PURE__ */ React6.createElement("option", null, "On duty"), /* @__PURE__ */ React6.createElement("option", null, "Inactive")))), /* @__PURE__ */ React6.createElement("button", { type: "submit", className: "primary-button" }, "Add User")), /* @__PURE__ */ React6.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, users.map((user) => /* @__PURE__ */ React6.createElement("div", { key: `${user.email}-${user.name}`, className: "route-card" }, /* @__PURE__ */ React6.createElement("div", { className: "route-head" }, /* @__PURE__ */ React6.createElement("strong", null, user.name), /* @__PURE__ */ React6.createElement("span", { className: user.status === "Active" || user.status === "On duty" ? "badge ok" : "badge neutral" }, user.status)), /* @__PURE__ */ React6.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React6.createElement("span", null, user.email), /* @__PURE__ */ React6.createElement("span", null, user.role), /* @__PURE__ */ React6.createElement("span", null, "Account"))))));
}

// src/admin/ManageRoutes.jsx
import React7 from "react";
var starterRoutes = [
  { name: "Iloilo City \u2192 Passi", origin: "Iloilo City", destination: "Passi", status: "Active" },
  { name: "Iloilo City \u2192 Oton", origin: "Iloilo City", destination: "Oton", status: "Active" },
  { name: "Iloilo City \u2192 Miago", origin: "Iloilo City", destination: "Miago", status: "Pending" }
];
function ManageRoutes() {
  const [routes, setRoutes] = React7.useState(starterRoutes);
  const [form, setForm] = React7.useState({ name: "", origin: "", destination: "", status: "Active" });
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
    setForm({ name: "", origin: "", destination: "", status: "Active" });
  };
  return /* @__PURE__ */ React7.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React7.createElement("h3", { className: "page-title" }, "Route Management"), /* @__PURE__ */ React7.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React7.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React7.createElement("div", { className: "field-block" }, /* @__PURE__ */ React7.createElement("label", null, "Route Name"), /* @__PURE__ */ React7.createElement("input", { type: "text", name: "name", value: form.name, onChange: handleChange, placeholder: "e.g. Iloilo City \u2192 San Joaquin" })), /* @__PURE__ */ React7.createElement("div", { className: "field-block" }, /* @__PURE__ */ React7.createElement("label", null, "Status"), /* @__PURE__ */ React7.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React7.createElement("option", null, "Active"), /* @__PURE__ */ React7.createElement("option", null, "Pending"), /* @__PURE__ */ React7.createElement("option", null, "Maintenance")))), /* @__PURE__ */ React7.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React7.createElement("div", { className: "field-block" }, /* @__PURE__ */ React7.createElement("label", null, "Origin"), /* @__PURE__ */ React7.createElement("input", { type: "text", name: "origin", value: form.origin, onChange: handleChange, placeholder: "Origin" })), /* @__PURE__ */ React7.createElement("div", { className: "field-block" }, /* @__PURE__ */ React7.createElement("label", null, "Destination"), /* @__PURE__ */ React7.createElement("input", { type: "text", name: "destination", value: form.destination, onChange: handleChange, placeholder: "Destination" }))), /* @__PURE__ */ React7.createElement("button", { type: "submit", className: "primary-button" }, "Add Route")), /* @__PURE__ */ React7.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, routes.map((route) => /* @__PURE__ */ React7.createElement("div", { key: `${route.name}-${route.origin}`, className: "route-card" }, /* @__PURE__ */ React7.createElement("div", { className: "route-head" }, /* @__PURE__ */ React7.createElement("strong", null, route.name), /* @__PURE__ */ React7.createElement("span", { className: route.status === "Active" ? "badge ok" : route.status === "Pending" ? "badge neutral" : "badge warn" }, route.status)), /* @__PURE__ */ React7.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React7.createElement("span", null, "From: ", route.origin), /* @__PURE__ */ React7.createElement("span", null, "To: ", route.destination), /* @__PURE__ */ React7.createElement("span", null, "Route"))))));
}

// src/admin/ManageSchedules.jsx
import React8 from "react";
var starterSchedules = [
  { route: "Iloilo City \u2192 Passi", departure: "08:00 AM", arrival: "09:30 AM", status: "On Time" },
  { route: "Iloilo City \u2192 Oton", departure: "09:00 AM", arrival: "10:15 AM", status: "On Time" },
  { route: "Iloilo City \u2192 Miago", departure: "10:30 AM", arrival: "11:20 AM", status: "Delayed" }
];
function ManageSchedules() {
  const [schedules, setSchedules] = React8.useState(starterSchedules);
  const [form, setForm] = React8.useState({ route: "", departure: "", arrival: "", status: "On Time" });
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
    setForm({ route: "", departure: "", arrival: "", status: "On Time" });
  };
  return /* @__PURE__ */ React8.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React8.createElement("h3", { className: "page-title" }, "Schedule Management"), /* @__PURE__ */ React8.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React8.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React8.createElement("div", { className: "field-block" }, /* @__PURE__ */ React8.createElement("label", null, "Route"), /* @__PURE__ */ React8.createElement("input", { type: "text", name: "route", value: form.route, onChange: handleChange, placeholder: "Route name" })), /* @__PURE__ */ React8.createElement("div", { className: "field-block" }, /* @__PURE__ */ React8.createElement("label", null, "Status"), /* @__PURE__ */ React8.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React8.createElement("option", null, "On Time"), /* @__PURE__ */ React8.createElement("option", null, "Delayed"), /* @__PURE__ */ React8.createElement("option", null, "Cancelled")))), /* @__PURE__ */ React8.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React8.createElement("div", { className: "field-block" }, /* @__PURE__ */ React8.createElement("label", null, "Departure"), /* @__PURE__ */ React8.createElement("input", { type: "text", name: "departure", value: form.departure, onChange: handleChange, placeholder: "08:00 AM" })), /* @__PURE__ */ React8.createElement("div", { className: "field-block" }, /* @__PURE__ */ React8.createElement("label", null, "Arrival"), /* @__PURE__ */ React8.createElement("input", { type: "text", name: "arrival", value: form.arrival, onChange: handleChange, placeholder: "09:30 AM" }))), /* @__PURE__ */ React8.createElement("button", { type: "submit", className: "primary-button" }, "Add Schedule")), /* @__PURE__ */ React8.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, schedules.map((schedule) => /* @__PURE__ */ React8.createElement("div", { key: `${schedule.route}-${schedule.departure}`, className: "route-card" }, /* @__PURE__ */ React8.createElement("div", { className: "route-head" }, /* @__PURE__ */ React8.createElement("strong", null, schedule.route), /* @__PURE__ */ React8.createElement("span", { className: schedule.status === "On Time" ? "badge ok" : schedule.status === "Delayed" ? "badge warn" : "badge neutral" }, schedule.status)), /* @__PURE__ */ React8.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React8.createElement("span", null, "Departure: ", schedule.departure), /* @__PURE__ */ React8.createElement("span", null, "Arrival: ", schedule.arrival), /* @__PURE__ */ React8.createElement("span", null, "Schedule"))))));
}

// src/admin/ManageAssignments.jsx
import React9 from "react";
var starterAssignments = [
  { staff: "R. Dela Cruz", route: "Iloilo City \u2192 Passi", bus: "Bus 08", shift: "Morning", status: "Assigned" },
  { staff: "A. Santos", route: "Iloilo City \u2192 Oton", bus: "Bus 09", shift: "Morning", status: "Assigned" },
  { staff: "M. Rivera", route: "Iloilo City \u2192 Miago", bus: "Bus 11", shift: "Afternoon", status: "Pending" }
];
function ManageAssignments() {
  const [assignments, setAssignments] = React9.useState(starterAssignments);
  const [form, setForm] = React9.useState({ staff: "", route: "", bus: "", shift: "Morning", status: "Assigned" });
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
    setForm({ staff: "", route: "", bus: "", shift: "Morning", status: "Assigned" });
  };
  return /* @__PURE__ */ React9.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React9.createElement("h3", { className: "page-title" }, "Assignment Management"), /* @__PURE__ */ React9.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React9.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React9.createElement("div", { className: "field-block" }, /* @__PURE__ */ React9.createElement("label", null, "Staff"), /* @__PURE__ */ React9.createElement("input", { type: "text", name: "staff", value: form.staff, onChange: handleChange, placeholder: "Assigned driver" })), /* @__PURE__ */ React9.createElement("div", { className: "field-block" }, /* @__PURE__ */ React9.createElement("label", null, "Route"), /* @__PURE__ */ React9.createElement("input", { type: "text", name: "route", value: form.route, onChange: handleChange, placeholder: "Route name" }))), /* @__PURE__ */ React9.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React9.createElement("div", { className: "field-block" }, /* @__PURE__ */ React9.createElement("label", null, "Bus"), /* @__PURE__ */ React9.createElement("input", { type: "text", name: "bus", value: form.bus, onChange: handleChange, placeholder: "Bus number" })), /* @__PURE__ */ React9.createElement("div", { className: "field-block" }, /* @__PURE__ */ React9.createElement("label", null, "Shift"), /* @__PURE__ */ React9.createElement("select", { name: "shift", value: form.shift, onChange: handleChange }, /* @__PURE__ */ React9.createElement("option", null, "Morning"), /* @__PURE__ */ React9.createElement("option", null, "Afternoon"), /* @__PURE__ */ React9.createElement("option", null, "Night")))), /* @__PURE__ */ React9.createElement("div", { className: "field-block" }, /* @__PURE__ */ React9.createElement("label", null, "Status"), /* @__PURE__ */ React9.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React9.createElement("option", null, "Assigned"), /* @__PURE__ */ React9.createElement("option", null, "Pending"), /* @__PURE__ */ React9.createElement("option", null, "On break"))), /* @__PURE__ */ React9.createElement("button", { type: "submit", className: "primary-button" }, "Add Assignment")), /* @__PURE__ */ React9.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, assignments.map((assignment) => /* @__PURE__ */ React9.createElement("div", { key: `${assignment.staff}-${assignment.route}`, className: "route-card" }, /* @__PURE__ */ React9.createElement("div", { className: "route-head" }, /* @__PURE__ */ React9.createElement("strong", null, assignment.staff), /* @__PURE__ */ React9.createElement("span", { className: assignment.status === "Assigned" ? "badge ok" : assignment.status === "Pending" ? "badge neutral" : "badge warn" }, assignment.status)), /* @__PURE__ */ React9.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React9.createElement("span", null, assignment.route), /* @__PURE__ */ React9.createElement("span", null, assignment.bus), /* @__PURE__ */ React9.createElement("span", null, assignment.shift))))));
}

// src/admin/ManageTerminals.jsx
import React10 from "react";
var starterTerminals = [
  { name: "Iloilo City Terminal", town: "Iloilo City", status: "Active" },
  { name: "Passi Terminal", town: "Passi", status: "Active" },
  { name: "Oton Terminal", town: "Oton", status: "Active" },
  { name: "Miago Terminal", town: "Miago", status: "Maintenance" }
];
function ManageTerminals() {
  const [terminals, setTerminals] = React10.useState(starterTerminals);
  const [form, setForm] = React10.useState({ name: "", town: "", status: "Active" });
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
    setForm({ name: "", town: "", status: "Active" });
  };
  return /* @__PURE__ */ React10.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React10.createElement("h3", { className: "page-title" }, "Terminal Management"), /* @__PURE__ */ React10.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React10.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React10.createElement("div", { className: "field-block" }, /* @__PURE__ */ React10.createElement("label", null, "Terminal Name"), /* @__PURE__ */ React10.createElement("input", { type: "text", name: "name", value: form.name, onChange: handleChange, placeholder: "Terminal name" })), /* @__PURE__ */ React10.createElement("div", { className: "field-block" }, /* @__PURE__ */ React10.createElement("label", null, "Town"), /* @__PURE__ */ React10.createElement("input", { type: "text", name: "town", value: form.town, onChange: handleChange, placeholder: "Town" }))), /* @__PURE__ */ React10.createElement("div", { className: "field-block" }, /* @__PURE__ */ React10.createElement("label", null, "Status"), /* @__PURE__ */ React10.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React10.createElement("option", null, "Active"), /* @__PURE__ */ React10.createElement("option", null, "Maintenance"), /* @__PURE__ */ React10.createElement("option", null, "Closed"))), /* @__PURE__ */ React10.createElement("button", { type: "submit", className: "primary-button" }, "Add Terminal")), /* @__PURE__ */ React10.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, terminals.map((terminal) => /* @__PURE__ */ React10.createElement("div", { key: `${terminal.name}-${terminal.town}`, className: "route-card" }, /* @__PURE__ */ React10.createElement("div", { className: "route-head" }, /* @__PURE__ */ React10.createElement("strong", null, terminal.name), /* @__PURE__ */ React10.createElement("span", { className: terminal.status === "Active" ? "badge ok" : terminal.status === "Maintenance" ? "badge warn" : "badge neutral" }, terminal.status)), /* @__PURE__ */ React10.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React10.createElement("span", null, terminal.town), /* @__PURE__ */ React10.createElement("span", null, "Terminal"), /* @__PURE__ */ React10.createElement("span", null, "Operations"))))));
}

// src/admin/ManageTowns.jsx
import React11 from "react";
var starterTowns = [
  { town: "Iloilo City", province: "Iloilo", routes: 8 },
  { town: "Passi", province: "Iloilo", routes: 4 },
  { town: "Oton", province: "Iloilo", routes: 3 },
  { town: "Miago", province: "Iloilo", routes: 2 }
];
function ManageTowns() {
  const [towns, setTowns] = React11.useState(starterTowns);
  const [form, setForm] = React11.useState({ town: "", province: "", routes: 1 });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "routes" ? Number(value) : value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.town.trim() || !form.province.trim()) {
      return;
    }
    setTowns((current) => [{ town: form.town.trim(), province: form.province.trim(), routes: form.routes || 1 }, ...current]);
    setForm({ town: "", province: "", routes: 1 });
  };
  return /* @__PURE__ */ React11.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React11.createElement("h3", { className: "page-title" }, "Town Management"), /* @__PURE__ */ React11.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React11.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React11.createElement("div", { className: "field-block" }, /* @__PURE__ */ React11.createElement("label", null, "Town"), /* @__PURE__ */ React11.createElement("input", { type: "text", name: "town", value: form.town, onChange: handleChange, placeholder: "Town name" })), /* @__PURE__ */ React11.createElement("div", { className: "field-block" }, /* @__PURE__ */ React11.createElement("label", null, "Province"), /* @__PURE__ */ React11.createElement("input", { type: "text", name: "province", value: form.province, onChange: handleChange, placeholder: "Province" }))), /* @__PURE__ */ React11.createElement("div", { className: "field-block" }, /* @__PURE__ */ React11.createElement("label", null, "Routes Served"), /* @__PURE__ */ React11.createElement("input", { type: "number", min: "1", name: "routes", value: form.routes, onChange: handleChange })), /* @__PURE__ */ React11.createElement("button", { type: "submit", className: "primary-button" }, "Add Town")), /* @__PURE__ */ React11.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, towns.map((town) => /* @__PURE__ */ React11.createElement("div", { key: `${town.town}-${town.province}`, className: "route-card" }, /* @__PURE__ */ React11.createElement("div", { className: "route-head" }, /* @__PURE__ */ React11.createElement("strong", null, town.town), /* @__PURE__ */ React11.createElement("span", { className: "badge ok" }, town.routes, " routes")), /* @__PURE__ */ React11.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React11.createElement("span", null, town.province), /* @__PURE__ */ React11.createElement("span", null, "Town"), /* @__PURE__ */ React11.createElement("span", null, "Coverage"))))));
}

// src/admin/ManageVehicles.jsx
import React12 from "react";
var starterVehicles = [
  { plate: "ABC-123", type: "Mini bus", route: "Iloilo City \u2192 Passi", status: "Ready" },
  { plate: "XYZ-456", type: "Bus", route: "Iloilo City \u2192 Oton", status: "In service" },
  { plate: "LMN-789", type: "Bus", route: "Iloilo City \u2192 Miago", status: "Maintenance" }
];
function ManageVehicles() {
  const [vehicles, setVehicles] = React12.useState(starterVehicles);
  const [form, setForm] = React12.useState({ plate: "", type: "Bus", route: "", status: "Ready" });
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
    setForm({ plate: "", type: "Bus", route: "", status: "Ready" });
  };
  return /* @__PURE__ */ React12.createElement("section", { className: "page-panel" }, /* @__PURE__ */ React12.createElement("h3", { className: "page-title" }, "Vehicle Management"), /* @__PURE__ */ React12.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ React12.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React12.createElement("div", { className: "field-block" }, /* @__PURE__ */ React12.createElement("label", null, "Plate Number"), /* @__PURE__ */ React12.createElement("input", { type: "text", name: "plate", value: form.plate, onChange: handleChange, placeholder: "ABC-123" })), /* @__PURE__ */ React12.createElement("div", { className: "field-block" }, /* @__PURE__ */ React12.createElement("label", null, "Type"), /* @__PURE__ */ React12.createElement("select", { name: "type", value: form.type, onChange: handleChange }, /* @__PURE__ */ React12.createElement("option", null, "Bus"), /* @__PURE__ */ React12.createElement("option", null, "Mini bus"), /* @__PURE__ */ React12.createElement("option", null, "Van")))), /* @__PURE__ */ React12.createElement("div", { className: "route-pair" }, /* @__PURE__ */ React12.createElement("div", { className: "field-block" }, /* @__PURE__ */ React12.createElement("label", null, "Assigned Route"), /* @__PURE__ */ React12.createElement("input", { type: "text", name: "route", value: form.route, onChange: handleChange, placeholder: "Route name" })), /* @__PURE__ */ React12.createElement("div", { className: "field-block" }, /* @__PURE__ */ React12.createElement("label", null, "Status"), /* @__PURE__ */ React12.createElement("select", { name: "status", value: form.status, onChange: handleChange }, /* @__PURE__ */ React12.createElement("option", null, "Ready"), /* @__PURE__ */ React12.createElement("option", null, "In service"), /* @__PURE__ */ React12.createElement("option", null, "Maintenance")))), /* @__PURE__ */ React12.createElement("button", { type: "submit", className: "primary-button" }, "Add Vehicle")), /* @__PURE__ */ React12.createElement("div", { className: "compact-list", style: { marginTop: 18 } }, vehicles.map((vehicle) => /* @__PURE__ */ React12.createElement("div", { key: `${vehicle.plate}-${vehicle.route}`, className: "route-card" }, /* @__PURE__ */ React12.createElement("div", { className: "route-head" }, /* @__PURE__ */ React12.createElement("strong", null, vehicle.plate), /* @__PURE__ */ React12.createElement("span", { className: vehicle.status === "Ready" || vehicle.status === "In service" ? "badge ok" : "badge warn" }, vehicle.status)), /* @__PURE__ */ React12.createElement("div", { className: "meta-grid" }, /* @__PURE__ */ React12.createElement("span", null, vehicle.type), /* @__PURE__ */ React12.createElement("span", null, vehicle.route), /* @__PURE__ */ React12.createElement("span", null, "Vehicle"))))));
}

// src/pages/StaffAdminApp.jsx
var navItems = [
  { label: "Staff Dashboard", icon: "\xE2\u2014\xAB" },
  { label: "Assigned Routes", icon: "\xE2\u017D\u02C6" },
  { label: "Trip Updates", icon: "\xE2\u0178\xA1" },
  { label: "Announcements", icon: "\xE2\u2014\u0152" },
  { label: "User Management", icon: "\xF0\u0178\u2018\xA4" },
  { label: "Route Management", icon: "\xF0\u0178\u203A\xA3" },
  { label: "Schedule Management", icon: "\xF0\u0178\u2014\u201C" },
  { label: "Assignment Management", icon: "\xF0\u0178\u201C\u2039" },
  { label: "Terminal Management", icon: "\xF0\u0178\x8F\xA2" },
  { label: "Town Management", icon: "\xF0\u0178\x8F\u02DC" },
  { label: "Vehicle Management", icon: "\xF0\u0178\u0161\x8D" },
  { label: "Logout", icon: "\xE2\u2014\x90" }
];
function App() {
  const [activeView, setActiveView] = React13.useState("Staff Dashboard");
  const renderMainContent = () => {
    if (activeView === "Assigned Routes") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(AssignedRoutes)));
    }
    if (activeView === "Trip Updates") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(TripUpdates)));
    }
    if (activeView === "Announcements") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageAnnouncements)));
    }
    if (activeView === "User Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageUsers)));
    }
    if (activeView === "Route Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageRoutes)));
    }
    if (activeView === "Schedule Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageSchedules)));
    }
    if (activeView === "Assignment Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageAssignments)));
    }
    if (activeView === "Terminal Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageTerminals)));
    }
    if (activeView === "Town Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageTowns)));
    }
    if (activeView === "Vehicle Management") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement(ManageVehicles)));
    }
    if (activeView === "Logout") {
      return React13.createElement("main", { className: "workspace" }, React13.createElement("div", { style: { width: "100%" } }, React13.createElement("section", { className: "panel" }, React13.createElement("h3", { className: "page-title" }, "Logged out"))));
    }
    return React13.createElement(
      "main",
      { className: "workspace" },
      React13.createElement(StaffDashboard),
      React13.createElement(AdminDashboard)
    );
  };
  return React13.createElement(
    "div",
    { className: "shell" },
    React13.createElement(
      "aside",
      { className: "sidebar" },
      React13.createElement(
        "div",
        { className: "brand-block" },
        React13.createElement("div", { className: "bus-mark" }, "\xF0\u0178\u0161\u0152"),
        React13.createElement("div", { className: "brand-name" }, "SakayTime")
      ),
      React13.createElement(
        "nav",
        { className: "nav" },
        navItems.map(
          (item) => React13.createElement(
            "button",
            {
              key: item.label,
              className: `nav-item ${activeView === item.label ? "active" : ""}`,
              onClick: () => setActiveView(item.label),
              type: "button"
            },
            React13.createElement("span", { className: "nav-icon" }, item.icon),
            item.label
          )
        )
      )
    ),
    renderMainContent()
  );
}
export {
  App as default
};
