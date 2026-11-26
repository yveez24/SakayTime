const db = require('./config/database');

const tables = [
    'users',
    'towns',
    'terminals',
    'routes',
    'route_stops',
    'vehicles',
    'schedules',
    'schedule_days',
    'staff_route_assignments',
    'trip_updates',
    'announcements',
    'favorites'
];

db.serialize(() => {
    tables.forEach((table) => {
        db.get(
            `SELECT COUNT(*) AS total FROM ${table}`,
            [],
            (err, result) => {
                if (err) {
                    console.error(
                        `Error checking ${table}:`,
                        err.message
                    );
                } else {
                    console.log(
                        `${table}: ${result.total} records`
                    );
                }
            }
        );
    });
});

db.close();