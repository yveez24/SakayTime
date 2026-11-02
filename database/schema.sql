CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'commuter'
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'commuter'
);

CREATE TABLE IF NOT EXISTS towns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    town_name TEXT NOT NULL UNIQUE,
    province TEXT NOT NULL DEFAULT 'Iloilo'
);

CREATE TABLE IF NOT EXISTS terminals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    terminal_name TEXT NOT NULL,
    town_id INTEGER NOT NULL,
    address TEXT,
    contact_number TEXT,
    FOREIGN KEY (town_id) REFERENCES towns(id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_name TEXT NOT NULL,
    origin_town_id INTEGER NOT NULL,
    destination_town_id INTEGER NOT NULL,
    transport_type TEXT NOT NULL,
    estimated_duration TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    FOREIGN KEY (origin_town_id) REFERENCES towns(id),
    FOREIGN KEY (destination_town_id) REFERENCES towns(id)
);

CREATE TABLE IF NOT EXISTS route_stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    terminal_id INTEGER NOT NULL,
    stop_order INTEGER NOT NULL,
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (terminal_id) REFERENCES terminals(id),
    UNIQUE (route_id, stop_order)
);

CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_type TEXT NOT NULL,
    plate_number TEXT NOT NULL UNIQUE,
    capacity INTEGER,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER NOT NULL,
    vehicle_id INTEGER NOT NULL,
    departure_time TEXT NOT NULL,
    arrival_time TEXT,
    status TEXT NOT NULL DEFAULT 'scheduled',
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE IF NOT EXISTS schedule_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER NOT NULL,
    day_of_week TEXT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    UNIQUE (schedule_id, day_of_week)
);

CREATE TABLE IF NOT EXISTS staff_route_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id INTEGER NOT NULL,
    route_id INTEGER NOT NULL,
    assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (staff_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES routes(id),
    UNIQUE (staff_id, route_id)
);

CREATE TABLE IF NOT EXISTS trip_updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    message TEXT,
    created_by INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    route_id INTEGER,
    terminal_id INTEGER,
    status TEXT NOT NULL DEFAULT 'draft',
    created_by INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (terminal_id) REFERENCES terminals(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    route_id INTEGER NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (route_id) REFERENCES routes(id),
    UNIQUE (user_id, route_id)
);

