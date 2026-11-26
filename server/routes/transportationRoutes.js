
const express = require('express');

const {
    getSchedules,
    getScheduleById,
    createSchedule,
    getTowns,
    getTerminals,
    getRoutes,
    getRouteById,
    getVehicles,
    createVehicle,
    updateVehicle,
    deactivateVehicle,
    createTown,
    updateTown,
    deleteTown,
    createTerminal,
    updateTerminal,
    deleteTerminal,
    createRoute,
    updateRoute,
    deactivateRoute
} = require('../controllers/transportationController');

const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Public transportation endpoints
router.get('/schedules', getSchedules);
router.get('/schedules/:id', getScheduleById);
router.get('/towns', getTowns);
router.get('/terminals', getTerminals);
router.get('/routes', getRoutes);
router.get('/routes/:id', getRouteById);
router.get('/vehicles', getVehicles);

// Admin: Create a new schedule
router.post(
    '/schedules',
    authMiddleware,
    authorizeRoles('admin'),
    createSchedule
);

// Admin: Create a new vehicle
router.post(
    '/vehicles',
    authMiddleware,
    authorizeRoles('admin'),
    createVehicle
);

// Admin: Update an existing vehicle
router.put(
    '/vehicles/:id',
    authMiddleware,
    authorizeRoles('admin'),
    updateVehicle
);

// Admin: Deactivate an existing vehicle
router.delete(
    '/vehicles/:id',
    authMiddleware,
    authorizeRoles('admin'),
    deactivateVehicle
);

// Admin-only town management endpoints
router.post('/towns', authMiddleware, authorizeRoles('admin'), createTown);
router.put('/towns/:id', authMiddleware, authorizeRoles('admin'), updateTown);
router.delete('/towns/:id', authMiddleware, authorizeRoles('admin'), deleteTown);

// Admin-only terminal management endpoints
router.post('/terminals', authMiddleware, authorizeRoles('admin'), createTerminal);
router.put('/terminals/:id', authMiddleware, authorizeRoles('admin'), updateTerminal);
router.delete('/terminals/:id', authMiddleware, authorizeRoles('admin'), deleteTerminal);

// Admin-only route management endpoints
router.post('/routes', authMiddleware, authorizeRoles('admin'), createRoute);
router.put('/routes/:id', authMiddleware, authorizeRoles('admin'), updateRoute);
router.delete('/routes/:id', authMiddleware, authorizeRoles('admin'), deactivateRoute);

module.exports = router;
