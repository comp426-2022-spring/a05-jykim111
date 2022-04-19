/**
 * Debug_route for logging purposes. If debug == true,
 * These functions will be used.
 */

const { all } = require("express/lib/application");

// endpoint for /app/log/access that returns all records in "accesslog" table in "log.db"
function all_records(req, res) {
    try {
        const statement = database.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(statement);
    } catch (e) {
        console.error(e);
    }
}

// endpoint for /app/error if there is an error.
function debug_error(req, res) {
    throw new Error('Error test successful.');
}

module.exports = {
    all_records: all_records,
    debug_error: debug_error
}