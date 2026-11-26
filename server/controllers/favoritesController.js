
const db = require('../config/database');
const { successResponse, errorResponse } = require('../utils/response');

// Get all favorites belonging to the logged-in user
const getFavorites = (req, res, next) => {
    const userId = req.user.id;

    const query = `
        SELECT
            f.id AS favorite_id,
            f.route_id,
            f.created_at,
            r.route_name,
            r.transport_type,
            r.estimated_duration,
            origin.town_name AS origin_town,
            destination.town_name AS destination_town
        FROM favorites f
        JOIN routes r ON f.route_id = r.id
        JOIN towns origin ON r.origin_town_id = origin.id
        JOIN towns destination ON r.destination_town_id = destination.id
        WHERE f.user_id = ?
        ORDER BY f.created_at DESC
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) return next(err);

        return successResponse(
            res,
            'Favorites retrieved successfully.',
            rows
        );
    });
};

// Add a route to the logged-in user's favorites
const addFavorite = (req, res, next) => {
    const userId = req.user.id;
    const routeId = Number(req.params.routeId);

    if (!Number.isInteger(routeId) || routeId <= 0) {
        return errorResponse(res, 'Invalid route ID.', 400);
    }

    db.get(
        'SELECT id, status FROM routes WHERE id = ?',
        [routeId],
        (routeError, route) => {
            if (routeError) return next(routeError);

            if (!route || route.status !== 'active') {
                return errorResponse(res, 'Active route not found.', 404);
            }

            db.run(
                'INSERT INTO favorites (user_id, route_id) VALUES (?, ?)',
                [userId, routeId],
                function (insertError) {
                    if (insertError) {
                        if (insertError.code === 'SQLITE_CONSTRAINT') {
                            return errorResponse(
                                res,
                                'This route is already in your favorites.',
                                409
                            );
                        }

                        return next(insertError);
                    }

                    return successResponse(
                        res,
                        'Route added to favorites successfully.',
                        {
                            id: this.lastID,
                            user_id: userId,
                            route_id: routeId
                        },
                        201
                    );
                }
            );
        }
    );
};

// Remove a route from the logged-in user's favorites
const removeFavorite = (req, res, next) => {
    const userId = req.user.id;
    const routeId = Number(req.params.routeId);

    if (!Number.isInteger(routeId) || routeId <= 0) {
        return errorResponse(res, 'Invalid route ID.', 400);
    }

    db.run(
        'DELETE FROM favorites WHERE user_id = ? AND route_id = ?',
        [userId, routeId],
        function (err) {
            if (err) return next(err);

            if (this.changes === 0) {
                return errorResponse(
                    res,
                    'Favorite route not found.',
                    404
                );
            }

            return successResponse(
                res,
                'Route removed from favorites successfully.',
                { route_id: routeId }
            );
        }
    );
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
};
