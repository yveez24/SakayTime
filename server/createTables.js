const fs = require('fs');
const path = require('path');
const db = require('./config/database');

const schemaPath = path.join(__dirname, '../database/schema.sql');

fs.readFile(schemaPath, 'utf8', (err, sql) => {
    if (err) {
        console.error('Failed to read schema.sql:', err.message);
        db.close();
        return;
    }

    db.exec(sql, (err) => {
        if (err) {
            console.error('Failed to create tables:', err.message);
        } else {
            console.log('Tables created successfully!');
        }

        db.close();
    });
});