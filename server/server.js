
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const apiRoutes = require('./routes');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Database test route
app.get('/api/db-test', (req, res, next) => {
    db.get('SELECT 1 AS result', [], (err, row) => {
        if (err) {
            err.statusCode = 500;
            return next(err);
        }

        res.json({
            success: true,
            message: 'SakayTime database is connected!',
            databaseTest: row.result
        });
    });
});

// Handle unknown routes
app.use(notFoundMiddleware);

// Handle other errors
app.use(errorMiddleware);

// Server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`SakayTime server running on port ${PORT}`);
});
