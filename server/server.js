
const express = require('express');
const cors = require('cors');
const path = require('path');
const esbuild = require('esbuild');

require('dotenv').config();

const db = require('./config/database');
const apiRoutes = require('./routes');

const app = express();
const projectRoot = path.join(__dirname, '..');

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

// Serve public assets
app.use(
    '/assets',
    express.static(path.join(projectRoot, 'public', 'assets'))
);

// Main frontend page
app.get('/', (req, res) => {
    res.sendFile(path.join(projectRoot, 'index.html'));
});

// Build and start application
async function startServer() {
    try {
        console.log('Building SakayTime frontend...');

        const result = await esbuild.build({
            entryPoints: [path.join(projectRoot, 'src/index.js')],
            bundle: true,
            write: false,
            format: 'esm',
            platform: 'browser',
            target: ['es2020'],
            loader: {
                '.js': 'jsx',
                '.jsx': 'jsx'
            },
            external: ['react', 'react-dom/client']
        });

        const frontendBundle = result.outputFiles[0].text;

        // Serve compiled frontend
        app.get('/app.js', (req, res) => {
            res.type('application/javascript');
            res.send(frontendBundle);
        });

        // Error handling must come after all application routes
        const notFoundMiddleware = require('./middleware/notFoundMiddleware');
        const errorMiddleware = require('./middleware/errorMiddleware');

        app.use(notFoundMiddleware);
        app.use(errorMiddleware);

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log('SakayTime frontend built successfully!');
            console.log(`SakayTime server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('SakayTime frontend build failed:');
        console.error(error);
        process.exit(1);
    }
}

startServer();
