
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
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

// Serve the Vite production build and public assets.
const frontendPath = path.join(__dirname, '../dist');
const frontendIndexPath = path.join(frontendPath, 'index.html');
app.use(express.static(fs.existsSync(frontendIndexPath) ? frontendPath : path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    if (!fs.existsSync(frontendIndexPath)) {
        return res.status(503).send('SakayTime frontend is not built yet. Run npm run build, then restart the server.');
    }

    return res.sendFile(frontendIndexPath);
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
