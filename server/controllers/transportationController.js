
const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

// Get all towns
const getTowns = (req, res, next) => {
    db.all(
        'SELECT id, town_name, province FROM towns ORDER BY town_name',
        [],
        (err, rows) => {
            if (err) return next(err);

            return successResponse(
                res,
                'Towns retrieved successfully.',
                rows
            );
        }
    );
};

// Get all terminals
const getTerminals = (req, res, next) => {
    const query = `
        SELECT
            t.id,
            t.terminal_name,
            t.town_id,
            towns.town_name,
            t.address,
            t.contact_number
        FROM terminals t
        JOIN towns ON t.town_id = towns.id
        ORDER BY t.terminal_name
    `;

    db.all(query, [], (err, rows) => {
        if (err) return next(err);

        return successResponse(
            res,
            'Terminals retrieved successfully.',
            rows
        );
    });
};

// Get all active routes
const getRoutes = (req, res, next) => {
    const query = `
        SELECT
            r.id,
            r.route_name,
            r.origin_town_id,
            origin.town_name AS origin,
            r.destination_town_id,
            destination.town_name AS destination,
            r.transport_type,
            r.estimated_duration,
            r.description,
            r.status
        FROM routes r
        JOIN towns origin ON r.origin_town_id = origin.id
        JOIN towns destination ON r.destination_town_id = destination.id
        WHERE r.status = 'active'
        ORDER BY r.route_name
    `;

    db.all(query, [], (err, rows) => {
        if (err) return next(err);

        return successResponse(
            res,
            'Routes retrieved successfully.',
            rows
        );
    });
};

// Get one active route with its ordered stops
const getRouteById = (req, res, next) => {
    const routeId = Number(req.params.id);

    if (!Number.isInteger(routeId) || routeId <= 0) {
        return errorResponse(res, 'Invalid route ID.', 400);
    }

    const routeQuery = `
        SELECT
            r.id,
            r.route_name,
            r.origin_town_id,
            origin.town_name AS origin,
            r.destination_town_id,
            destination.town_name AS destination,
            r.transport_type,
            r.estimated_duration,
            r.description,
            r.status
        FROM routes r
        JOIN towns origin ON r.origin_town_id = origin.id
        JOIN towns destination ON r.destination_town_id = destination.id
        WHERE r.id = ? AND r.status = 'active'
    `;

    db.get(routeQuery, [routeId], (err, route) => {
        if (err) return next(err);

        if (!route) {
            return errorResponse(res, 'Route not found.', 404);
        }

        const stopsQuery = `
            SELECT
                rs.id,
                rs.terminal_id,
                t.terminal_name,
                t.address,
                t.town_id,
                towns.town_name,
                rs.stop_order
            FROM route_stops rs
            JOIN terminals t ON rs.terminal_id = t.id
            JOIN towns ON t.town_id = towns.id
            WHERE rs.route_id = ?
            ORDER BY rs.stop_order ASC
        `;

        db.all(stopsQuery, [routeId], (stopsError, stops) => {
            if (stopsError) return next(stopsError);

            return successResponse(
                res,
                'Route details retrieved successfully.',
                {
                    ...route,
                    stops
                }
            );
        });
    });
};


// Get all active vehicles
const getVehicles = (req, res, next) => {
    const query = `
        SELECT
            id,
            vehicle_type,
            plate_number,
            capacity,
            description,
            status
        FROM vehicles
        WHERE status = 'active'
        ORDER BY vehicle_type, id
    `;

    db.all(query, [], (err, rows) => {
        if (err) return next(err);

        return successResponse(
            res,
            'Vehicles retrieved successfully.',
            rows
        );
    });
};


 // Create a new vehicle (Admin only)
const createVehicle = (req, res) => {
    const {
        vehicle_type,
        plate_number,
        capacity,
        description
    } = req.body;

    if (
        typeof vehicle_type !== 'string' ||
        !['bus', 'van'].includes(vehicle_type.trim().toLowerCase())
    ) {
        return errorResponse(res, 'Vehicle type must be bus or van.', 400);
    }

    if (
        typeof plate_number !== 'string' ||
        !plate_number.trim()
    ) {
        return errorResponse(res, 'Plate number is required.', 400);
    }

    if (
        capacity !== undefined &&
        capacity !== null &&
        (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0)
    ) {
        return errorResponse(res, 'Capacity must be a positive whole number.', 400);
    }

    if (
        description !== undefined &&
        description !== null &&
        typeof description !== 'string'
    ) {
        return errorResponse(res, 'Description must be text.', 400);
    }

    const cleanType = vehicle_type.trim().toLowerCase();
    const cleanPlateNumber = plate_number.trim().toUpperCase();
    const cleanCapacity = capacity === undefined || capacity === null
        ? null
        : Number(capacity);
    const cleanDescription = description?.trim() || null;

    const query = `
        INSERT INTO vehicles (
            vehicle_type,
            plate_number,
            capacity,
            description
        )
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        query,
        [
            cleanType,
            cleanPlateNumber,
            cleanCapacity,
            cleanDescription
        ],
        function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return errorResponse(
                        res,
                        'A vehicle with this plate number already exists.',
                        409
                    );
                }

                return errorResponse(res, 'Failed to create vehicle.', 500);
            }

            return successResponse(
                res,
                'Vehicle created successfully.',
                {
                    id: this.lastID,
                    vehicle_type: cleanType,
                    plate_number: cleanPlateNumber,
                    capacity: cleanCapacity,
                    description: cleanDescription,
                    status: 'active'
                },
                201
            );
        }
    );
};


// Update an existing vehicle (Admin only)
const updateVehicle = (req, res) => {
    const vehicleId = Number(req.params.id);

    const {
        vehicle_type,
        plate_number,
        capacity,
        description
    } = req.body;

    if (!Number.isInteger(vehicleId) || vehicleId <= 0) {
        return errorResponse(res, 'Invalid vehicle ID.', 400);
    }

    if (
        typeof vehicle_type !== 'string' ||
        !['bus', 'van'].includes(vehicle_type.trim().toLowerCase())
    ) {
        return errorResponse(res, 'Vehicle type must be bus or van.', 400);
    }

    if (
        typeof plate_number !== 'string' ||
        !plate_number.trim()
    ) {
        return errorResponse(res, 'Plate number is required.', 400);
    }

    if (
        capacity !== undefined &&
        capacity !== null &&
        (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0)
    ) {
        return errorResponse(res, 'Capacity must be a positive whole number.', 400);
    }

    if (
        description !== undefined &&
        description !== null &&
        typeof description !== 'string'
    ) {
        return errorResponse(res, 'Description must be text.', 400);
    }

    const cleanType = vehicle_type.trim().toLowerCase();
    const cleanPlateNumber = plate_number.trim().toUpperCase();
    const cleanCapacity = capacity === undefined || capacity === null
        ? null
        : Number(capacity);
    const cleanDescription = description?.trim() || null;

    db.get(
        'SELECT id, status FROM vehicles WHERE id = ?',
        [vehicleId],
        (err, vehicle) => {
            if (err) {
                return errorResponse(res, 'Failed to retrieve vehicle.', 500);
            }

            if (!vehicle) {
                return errorResponse(res, 'Vehicle not found.', 404);
            }

            if (vehicle.status === 'inactive') {
                return errorResponse(
                    res,
                    'Inactive vehicles cannot be updated.',
                    409
                );
            }

            const query = `
                UPDATE vehicles
                SET
                    vehicle_type = ?,
                    plate_number = ?,
                    capacity = ?,
                    description = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [
                    cleanType,
                    cleanPlateNumber,
                    cleanCapacity,
                    cleanDescription,
                    vehicleId
                ],
                function (updateError) {
                    if (updateError) {
                        if (updateError.code === 'SQLITE_CONSTRAINT') {
                            return errorResponse(
                                res,
                                'A vehicle with this plate number already exists.',
                                409
                            );
                        }

                        return errorResponse(
                            res,
                            'Failed to update vehicle.',
                            500
                        );
                    }

                    return successResponse(
                        res,
                        'Vehicle updated successfully.',
                        {
                            id: vehicleId,
                            vehicle_type: cleanType,
                            plate_number: cleanPlateNumber,
                            capacity: cleanCapacity,
                            description: cleanDescription,
                            status: vehicle.status
                        }
                    );
                }
            );
        }
    );
};


// Create a new town (Admin only)
const createTown = (req, res, next) => {
    const { town_name, province } = req.body;

    if (!town_name || !town_name.trim()) {
        return errorResponse(res, 'Town name is required.', 400);
    }

    const cleanTownName = town_name.trim();
    const cleanProvince = province?.trim() || 'Iloilo';

    const query = `
        INSERT INTO towns (town_name, province)
        VALUES (?, ?)
    `;

    db.run(query, [cleanTownName, cleanProvince], function (err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return errorResponse(
                    res,
                    'A town with this name already exists.',
                    409
                );
            }

            return next(err);
        }

        return successResponse(
            res,
            'Town created successfully.',
            {
                id: this.lastID,
                town_name: cleanTownName,
                province: cleanProvince
            },
            201
        );
    });
};

// Update an existing town (Admin only)
const updateTown = (req, res, next) => {
    const townId = Number(req.params.id);
    const { town_name, province } = req.body;

    if (!Number.isInteger(townId) || townId <= 0) {
        return errorResponse(res, 'Invalid town ID.', 400);
    }

    if (!town_name || !town_name.trim()) {
        return errorResponse(res, 'Town name is required.', 400);
    }

    const cleanTownName = town_name.trim();
    const cleanProvince = province?.trim() || 'Iloilo';

    const query = `
        UPDATE towns
        SET town_name = ?, province = ?
        WHERE id = ?
    `;

    db.run(query, [cleanTownName, cleanProvince, townId], function (err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return errorResponse(
                    res,
                    'A town with this name already exists.',
                    409
                );
            }

            return next(err);
        }

        if (this.changes === 0) {
            return errorResponse(res, 'Town not found.', 404);
        }

        return successResponse(
            res,
            'Town updated successfully.',
            {
                id: townId,
                town_name: cleanTownName,
                province: cleanProvince
            }
        );
    });
};

// Delete a town (Admin only)
const deleteTown = (req, res, next) => {
    const townId = Number(req.params.id);

    if (!Number.isInteger(townId) || townId <= 0) {
        return errorResponse(res, 'Invalid town ID.', 400);
    }

    db.run(
        'DELETE FROM towns WHERE id = ?',
        [townId],
        function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return errorResponse(
                        res,
                        'Cannot delete this town because it is being used by other transportation records.',
                        409
                    );
                }

                return next(err);
            }

            if (this.changes === 0) {
                return errorResponse(res, 'Town not found.', 404);
            }

            return successResponse(
                res,
                'Town deleted successfully.',
                { id: townId }
            );
        }
    );
};


// Create a new terminal (Admin only)
const createTerminal = (req, res, next) => {
    const { terminal_name, town_id, address, contact_number } = req.body;

    if (
        typeof terminal_name !== 'string' ||
        !terminal_name.trim()
    ) {
        return errorResponse(res, 'Terminal name is required.', 400);
    }

    const townId = Number(town_id);

    if (!Number.isInteger(townId) || townId <= 0) {
        return errorResponse(res, 'A valid town ID is required.', 400);
    }

    const cleanName = terminal_name.trim();
    const cleanAddress =
        typeof address === 'string' ? address.trim() || null : null;
    const cleanContact =
        typeof contact_number === 'string'
            ? contact_number.trim() || null
            : null;

    db.get(
        'SELECT id FROM towns WHERE id = ?',
        [townId],
        (townError, town) => {
            if (townError) return next(townError);

            if (!town) {
                return errorResponse(res, 'Town not found.', 404);
            }

            const query = `
                INSERT INTO terminals
                    (terminal_name, town_id, address, contact_number)
                VALUES (?, ?, ?, ?)
            `;

            db.run(
                query,
                [cleanName, townId, cleanAddress, cleanContact],
                function (err) {
                    if (err) return next(err);

                    return successResponse(
                        res,
                        'Terminal created successfully.',
                        {
                            id: this.lastID,
                            terminal_name: cleanName,
                            town_id: townId,
                            address: cleanAddress,
                            contact_number: cleanContact
                        },
                        201
                    );
                }
            );
        }
    );
};

// Update an existing terminal (Admin only)
const updateTerminal = (req, res, next) => {
    const terminalId = Number(req.params.id);
    const { terminal_name, town_id, address, contact_number } = req.body;

    if (!Number.isInteger(terminalId) || terminalId <= 0) {
        return errorResponse(res, 'Invalid terminal ID.', 400);
    }

    if (
        typeof terminal_name !== 'string' ||
        !terminal_name.trim()
    ) {
        return errorResponse(res, 'Terminal name is required.', 400);
    }

    const townId = Number(town_id);

    if (!Number.isInteger(townId) || townId <= 0) {
        return errorResponse(res, 'A valid town ID is required.', 400);
    }

    const cleanName = terminal_name.trim();
    const cleanAddress =
        typeof address === 'string' ? address.trim() || null : null;
    const cleanContact =
        typeof contact_number === 'string'
            ? contact_number.trim() || null
            : null;

    db.get(
        'SELECT id FROM towns WHERE id = ?',
        [townId],
        (townError, town) => {
            if (townError) return next(townError);

            if (!town) {
                return errorResponse(res, 'Town not found.', 404);
            }

            const query = `
                UPDATE terminals
                SET terminal_name = ?,
                    town_id = ?,
                    address = ?,
                    contact_number = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [cleanName, townId, cleanAddress, cleanContact, terminalId],
                function (err) {
                    if (err) return next(err);

                    if (this.changes === 0) {
                        return errorResponse(res, 'Terminal not found.', 404);
                    }

                    return successResponse(
                        res,
                        'Terminal updated successfully.',
                        {
                            id: terminalId,
                            terminal_name: cleanName,
                            town_id: townId,
                            address: cleanAddress,
                            contact_number: cleanContact
                        }
                    );
                }
            );
        }
    );
};

// Delete a terminal (Admin only)
const deleteTerminal = (req, res, next) => {
    const terminalId = Number(req.params.id);

    if (!Number.isInteger(terminalId) || terminalId <= 0) {
        return errorResponse(res, 'Invalid terminal ID.', 400);
    }

    db.get(
        'SELECT id FROM terminals WHERE id = ?',
        [terminalId],
        (findError, terminal) => {
            if (findError) return next(findError);

            if (!terminal) {
                return errorResponse(res, 'Terminal not found.', 404);
            }

            db.get(
                'SELECT id FROM route_stops WHERE terminal_id = ? LIMIT 1',
                [terminalId],
                (stopError, stop) => {
                    if (stopError) return next(stopError);

                    if (stop) {
                        return errorResponse(
                            res,
                            'Cannot delete this terminal because it is used in an existing route.',
                            409
                        );
                    }

                    db.run(
                        'DELETE FROM terminals WHERE id = ?',
                        [terminalId],
                        function (err) {
                            if (err) return next(err);

                            return successResponse(
                                res,
                                'Terminal deleted successfully.',
                                { id: terminalId }
                            );
                        }
                    );
                }
            );
        }
    );
};


// Create a new route with its ordered terminal stops
const createRoute = (req, res, next) => {
    const {
        route_name,
        origin_town_id,
        destination_town_id,
        transport_type,
        estimated_duration,
        description,
        stops
    } = req.body;

    const originId = Number(origin_town_id);
    const destinationId = Number(destination_town_id);
    const normalizedType = String(transport_type || '').trim().toLowerCase();

    // Validate required route information
    if (!route_name || typeof route_name !== 'string' || !route_name.trim()) {
        return errorResponse(res, 'Route name is required.', 400);
    }

    if (
        !Number.isInteger(originId) ||
        originId <= 0 ||
        !Number.isInteger(destinationId) ||
        destinationId <= 0
    ) {
        return errorResponse(res, 'Valid origin and destination town IDs are required.', 400);
    }

    if (originId === destinationId) {
        return errorResponse(res, 'Origin and destination towns must be different.', 400);
    }

    if (!['bus', 'van'].includes(normalizedType)) {
        return errorResponse(res, 'Transport type must be bus or van.', 400);
    }

    if (estimated_duration != null && typeof estimated_duration !== 'string') {
        return errorResponse(res, 'Estimated duration must be a string.', 400);
    }

    if (description != null && typeof description !== 'string') {
        return errorResponse(res, 'Description must be a string.', 400);
    }

    // Validate route stops
    if (!Array.isArray(stops) || stops.length < 2) {
        return errorResponse(res, 'A route must have at least two terminal stops.', 400);
    }

    const terminalIds = [];

for (let i = 0; i < stops.length; i++) {
    if (!stops[i] || typeof stops[i] !== 'object') {
        return errorResponse(res, 'Each stop must be a valid object.', 400);
    }

    const terminalId = Number(stops[i].terminal_id);
    const stopOrder = Number(stops[i].stop_order);
        if (
            !Number.isInteger(terminalId) ||
            terminalId <= 0 ||
            stopOrder !== i + 1
        ) {
            return errorResponse(
                res,
                'Each stop must have a valid terminal ID and sequential stop order starting at 1.',
                400
            );
        }

        if (terminalIds.includes(terminalId)) {
            return errorResponse(res, 'A terminal cannot appear more than once in a route.', 400);
        }

        terminalIds.push(terminalId);
    }

    // Check that both towns exist
    db.get(
        'SELECT id FROM towns WHERE id = ?',
        [originId],
        (originError, originTown) => {
            if (originError) return next(originError);

            if (!originTown) {
                return errorResponse(res, 'Origin town not found.', 404);
            }

            db.get(
                'SELECT id FROM towns WHERE id = ?',
                [destinationId],
                (destinationError, destinationTown) => {
                    if (destinationError) return next(destinationError);

                    if (!destinationTown) {
                        return errorResponse(res, 'Destination town not found.', 404);
                    }

                    // Check that every terminal exists
                    const placeholders = terminalIds.map(() => '?').join(', ');

                    db.all(
                        `SELECT id, town_id FROM terminals WHERE id IN (${placeholders})`,
                        terminalIds,
                        (terminalError, terminals) => {
                            if (terminalError) return next(terminalError);

                            if (terminals.length !== terminalIds.length) {
                                return errorResponse(res, 'One or more terminals were not found.', 404);
                            }

                            const terminalMap = new Map(
                                terminals.map(terminal => [terminal.id, terminal])
                            );

                            const firstTerminal = terminalMap.get(terminalIds[0]);
                            const lastTerminal = terminalMap.get(terminalIds[terminalIds.length - 1]);

                            if (
                                firstTerminal.town_id !== originId ||
                                lastTerminal.town_id !== destinationId
                            ) {
                                return errorResponse(
                                    res,
                                    'The first and last terminals must belong to the route origin and destination towns.',
                                    400
                                );
                            }

                            // Begin transaction: create route and stops together
                            db.run('BEGIN IMMEDIATE TRANSACTION', (beginError) => {
                                if (beginError) return next(beginError);

                                db.run(
                                    `INSERT INTO routes (
                                        route_name,
                                        origin_town_id,
                                        destination_town_id,
                                        transport_type,
                                        estimated_duration,
                                        description,
                                        status
                                    ) VALUES (?, ?, ?, ?, ?, ?, 'active')`,
                                    [
                                        route_name.trim(),
                                        originId,
                                        destinationId,
                                        normalizedType,
                                        estimated_duration ? estimated_duration.trim() : null,
                                        description ? description.trim() : null
                                    ],
                                    function (insertError) {
                                        if (insertError) {
                                            return db.run('ROLLBACK', () => next(insertError));
                                        }

                                        const newRouteId = this.lastID;
                                        let currentIndex = 0;

                                        const insertNextStop = () => {
                                            if (currentIndex >= stops.length) {
                                                return db.run('COMMIT', (commitError) => {
                                                    if (commitError) {
                                                        return db.run('ROLLBACK', () => next(commitError));
                                                    }

                                                    return successResponse(
                                                        res,
                                                        'Route created successfully.',
                                                        { id: newRouteId },
                                                        201
                                                    );
                                                });
                                            }

                                            const stop = stops[currentIndex];

                                            db.run(
                                                `INSERT INTO route_stops (
                                                    route_id,
                                                    terminal_id,
                                                    stop_order
                                                ) VALUES (?, ?, ?)`,
                                                [
                                                    newRouteId,
                                                    Number(stop.terminal_id),
                                                    Number(stop.stop_order)
                                                ],
                                                (stopError) => {
                                                    if (stopError) {
                                                        return db.run(
                                                            'ROLLBACK',
                                                            () => next(stopError)
                                                        );
                                                    }

                                                    currentIndex++;
                                                    insertNextStop();
                                                }
                                            );
                                        };

                                        insertNextStop();
                                    }
                                );
                            });
                        }
                    );
                }
            );
        }
    );
};


// Update an existing route and replace its ordered terminal stops
const updateRoute = (req, res, next) => {
    const routeId = Number(req.params.id);

    const {
        route_name,
        origin_town_id,
        destination_town_id,
        transport_type,
        estimated_duration,
        description,
        stops
    } = req.body;

    const originId = Number(origin_town_id);
    const destinationId = Number(destination_town_id);
    const normalizedType = String(transport_type || '').trim().toLowerCase();

    // Validate route ID
    if (!Number.isInteger(routeId) || routeId <= 0) {
        return errorResponse(res, 'Invalid route ID.', 400);
    }

    // Validate required route information
    if (!route_name || typeof route_name !== 'string' || !route_name.trim()) {
        return errorResponse(res, 'Route name is required.', 400);
    }

    if (
        !Number.isInteger(originId) ||
        originId <= 0 ||
        !Number.isInteger(destinationId) ||
        destinationId <= 0
    ) {
        return errorResponse(res, 'Valid origin and destination town IDs are required.', 400);
    }

    if (originId === destinationId) {
        return errorResponse(res, 'Origin and destination towns must be different.', 400);
    }

    if (!['bus', 'van'].includes(normalizedType)) {
        return errorResponse(res, 'Transport type must be bus or van.', 400);
    }

    if (estimated_duration != null && typeof estimated_duration !== 'string') {
        return errorResponse(res, 'Estimated duration must be a string.', 400);
    }

    if (description != null && typeof description !== 'string') {
        return errorResponse(res, 'Description must be a string.', 400);
    }

    // Validate route stops
    if (!Array.isArray(stops) || stops.length < 2) {
        return errorResponse(res, 'A route must have at least two terminal stops.', 400);
    }

    const terminalIds = [];

    for (let i = 0; i < stops.length; i++) {
        if (
            !stops[i] ||
            typeof stops[i] !== 'object' ||
            Array.isArray(stops[i])
        ) {
            return errorResponse(res, 'Each stop must be a valid object.', 400);
        }

        const terminalId = Number(stops[i].terminal_id);
        const stopOrder = Number(stops[i].stop_order);

        if (
            !Number.isInteger(terminalId) ||
            terminalId <= 0 ||
            stopOrder !== i + 1
        ) {
            return errorResponse(
                res,
                'Each stop must have a valid terminal ID and sequential stop order starting at 1.',
                400
            );
        }

        if (terminalIds.includes(terminalId)) {
            return errorResponse(
                res,
                'A terminal cannot appear more than once in a route.',
                400
            );
        }

        terminalIds.push(terminalId);
    }

    // Check whether the route exists
    db.get(
        'SELECT id FROM routes WHERE id = ?',
        [routeId],
        (routeError, existingRoute) => {
            if (routeError) return next(routeError);

            if (!existingRoute) {
                return errorResponse(res, 'Route not found.', 404);
            }

            // Check whether the origin town exists
            db.get(
                'SELECT id FROM towns WHERE id = ?',
                [originId],
                (originError, originTown) => {
                    if (originError) return next(originError);

                    if (!originTown) {
                        return errorResponse(res, 'Origin town not found.', 404);
                    }

                    // Check whether the destination town exists
                    db.get(
                        'SELECT id FROM towns WHERE id = ?',
                        [destinationId],
                        (destinationError, destinationTown) => {
                            if (destinationError) return next(destinationError);

                            if (!destinationTown) {
                                return errorResponse(res, 'Destination town not found.', 404);
                            }

                            // Check whether all terminals exist
                            const placeholders = terminalIds.map(() => '?').join(', ');

                            db.all(
                                `SELECT id, town_id FROM terminals
                                 WHERE id IN (${placeholders})`,
                                terminalIds,
                                (terminalError, terminals) => {
                                    if (terminalError) return next(terminalError);

                                    if (terminals.length !== terminalIds.length) {
                                        return errorResponse(
                                            res,
                                            'One or more terminals were not found.',
                                            404
                                        );
                                    }

                                    const terminalMap = new Map(
                                        terminals.map(terminal => [
                                            terminal.id,
                                            terminal
                                        ])
                                    );

                                    const firstTerminal = terminalMap.get(terminalIds[0]);
                                    const lastTerminal = terminalMap.get(
                                        terminalIds[terminalIds.length - 1]
                                    );

                                    // Verify first and last terminal towns
                                    if (
                                        firstTerminal.town_id !== originId ||
                                        lastTerminal.town_id !== destinationId
                                    ) {
                                        return errorResponse(
                                            res,
                                            'The first and last terminals must belong to the route origin and destination towns.',
                                            400
                                        );
                                    }

                                    // Start transaction
                                    db.run('BEGIN IMMEDIATE TRANSACTION', (beginError) => {
                                        if (beginError) return next(beginError);

                                        const rollback = (error) => {
                                            db.run('ROLLBACK', () => next(error));
                                        };

                                        // Update route information
                                        db.run(
                                            `UPDATE routes
                                             SET route_name = ?,
                                                 origin_town_id = ?,
                                                 destination_town_id = ?,
                                                 transport_type = ?,
                                                 estimated_duration = ?,
                                                 description = ?
                                             WHERE id = ?`,
                                            [
                                                route_name.trim(),
                                                originId,
                                                destinationId,
                                                normalizedType,
                                                estimated_duration
                                                    ? estimated_duration.trim()
                                                    : null,
                                                description
                                                    ? description.trim()
                                                    : null,
                                                routeId
                                            ],
                                            (updateError) => {
                                                if (updateError) return rollback(updateError);

                                                // Remove the old stops before inserting replacements
                                                db.run(
                                                    'DELETE FROM route_stops WHERE route_id = ?',
                                                    [routeId],
                                                    (deleteError) => {
                                                        if (deleteError) {
                                                            return rollback(deleteError);
                                                        }

                                                        let currentIndex = 0;

                                                        // Insert replacement stops in order
                                                        const insertNextStop = () => {
                                                            if (currentIndex >= stops.length) {
                                                                return db.run(
                                                                    'COMMIT',
                                                                    (commitError) => {
                                                                        if (commitError) {
                                                                            return rollback(commitError);
                                                                        }

                                                                        return successResponse(
                                                                            res,
                                                                            'Route updated successfully.',
                                                                            { id: routeId }
                                                                        );
                                                                    }
                                                                );
                                                            }

                                                            const stop = stops[currentIndex];

                                                            db.run(
                                                                `INSERT INTO route_stops (
                                                                    route_id,
                                                                    terminal_id,
                                                                    stop_order
                                                                ) VALUES (?, ?, ?)`,
                                                                [
                                                                    routeId,
                                                                    Number(stop.terminal_id),
                                                                    Number(stop.stop_order)
                                                                ],
                                                                (stopError) => {
                                                                    if (stopError) {
                                                                        return rollback(stopError);
                                                                    }

                                                                    currentIndex++;
                                                                    insertNextStop();
                                                                }
                                                            );
                                                        };

                                                        insertNextStop();
                                                    }
                                                );
                                            }
                                        );
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};


// Deactivate a route without permanently deleting its records
const deactivateRoute = (req, res) => {
    const routeId = Number(req.params.id);

    if (!Number.isInteger(routeId) || routeId <= 0) {
        return errorResponse(res, 'Invalid route ID.', 400);
    }

    db.get(
        'SELECT id, status FROM routes WHERE id = ?',
        [routeId],
        (err, route) => {
            if (err) {
                return errorResponse(res, 'Failed to retrieve route.', 500);
            }

            if (!route) {
                return errorResponse(res, 'Route not found.', 404);
            }

            if (route.status === 'inactive') {
                return successResponse(
                    res,
                    'Route is already inactive.',
                    { id: routeId, status: 'inactive' }
                );
            }

            db.run(
                'UPDATE routes SET status = ? WHERE id = ?',
                ['inactive', routeId],
                function (updateError) {
                    if (updateError) {
                        return errorResponse(
                            res,
                            'Failed to deactivate route.',
                            500
                        );
                    }

                    return successResponse(
                        res,
                        'Route deactivated successfully.',
                        { id: routeId, status: 'inactive' }
                    );
                }
            );
        }
    );
};


// Deactivate a vehicle (Admin only)
const deactivateVehicle = (req, res) => {
    const vehicleId = Number(req.params.id);

    if (!Number.isInteger(vehicleId) || vehicleId <= 0) {
        return errorResponse(res, 'Invalid vehicle ID.', 400);
    }

    db.get(
        'SELECT id, status FROM vehicles WHERE id = ?',
        [vehicleId],
        (err, vehicle) => {
            if (err) {
                return errorResponse(res, 'Failed to retrieve vehicle.', 500);
            }

            if (!vehicle) {
                return errorResponse(res, 'Vehicle not found.', 404);
            }

            if (vehicle.status === 'inactive') {
                return successResponse(
                    res,
                    'Vehicle is already inactive.',
                    { id: vehicleId, status: 'inactive' }
                );
            }

            db.run(
                'UPDATE vehicles SET status = ? WHERE id = ?',
                ['inactive', vehicleId],
                function (updateError) {
                    if (updateError) {
                        return errorResponse(
                            res,
                            'Failed to deactivate vehicle.',
                            500
                        );
                    }

                    return successResponse(
                        res,
                        'Vehicle deactivated successfully.',
                        { id: vehicleId, status: 'inactive' }
                    );
                }
            );
        }
    );
};


module.exports = {
    getTowns,
    getTerminals,
    getRoutes,
    getRouteById,
    getVehicles,
    createTown,
    updateTown,
    deleteTown,
    createTerminal,
    updateTerminal,
    deleteTerminal,
    createRoute,
    updateRoute,
    deactivateRoute,
    createVehicle,
    updateVehicle,
    deactivateVehicle
};
