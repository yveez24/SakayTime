const db = require('./config/database');

db.run(
    `INSERT INTO terminals (terminal_name, town_id)
     VALUES (?, ?)`,
    ['Test Terminal', 9999],
    function (err) {
        if (err) {
            console.log('Foreign key test passed!');
            console.log('SQLite prevented an invalid town reference.');
            console.log('Message:', err.message);
        } else {
            console.log('Foreign key test failed!');
        }

        db.close();
    }
);