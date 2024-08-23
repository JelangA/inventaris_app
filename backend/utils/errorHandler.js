const { responseErr } = require('./responseHelpers');

const handleSequelizeError = (error, res) => {
    if (error.name === 'SequelizeValidationError') {
        return responseErr(res, error.errors.map(e => e.message).join(', '), 400);
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return responseErr(res, error.errors[0].message, 409);
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return responseErr(res, error.message, 400);
    }

    if (error.name === 'SequelizeDatabaseError') {
        return responseErr(res, error.message, 500);
    }

    if (error.name === 'SequelizeConnectionError') {
        return responseErr(res, error.message, 503);
    }

    if (error.name === 'SequelizeTimeoutError') {
        return responseErr(res, 'Database operation timed out', 408);
    }

    if (error.name === 'SequelizeHostNotFoundError') {
        return responseErr(res, 'Database host not found', 503);
    }

    if (error.name === 'SequelizeConnectionRefusedError') {
        return responseErr(res, 'Database connection refused', 503);
    }

    if (error.name === 'SequelizeAccessDeniedError') {
        return responseErr(res, 'Database access denied', 403);
    }

    if (error.name === 'SequelizeHostNotReachableError') {
        return responseErr(res, 'Database host not reachable', 503);
    }

    if (error.name === 'SequelizeInvalidConnectionError') {
        return responseErr(res, 'Invalid database connection', 503);
    }

    if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return responseErr(res, 'Database connection acquisition timed out', 408);
    }

    return responseErr(res, 'An unexpected error occurred', 500);
};


module.exports = { handleSequelizeError };