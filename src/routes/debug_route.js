/**
 * Debug_route for logging purposes. If debug == true,
 * These functions will be used.
 */

// Define express
const express = require('express');

// Define router object that is an instance used extensively for express.
const debug_router = express.Router();

// Import database
const database = require('../services/database');

// endpoint for /app/log/access that returns all records in "accesslog" table in "log.db"
debug_router.get('/log/access', (req, res) => {
    try {
        const statement = database.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(statement);
    } catch (e) {
        console.error(e);
    }
})

// endpoint for /app/error if there is an error.
debug_router.get('/error', (req, res) => {
    throw new Error('Error test successful.');
})

module.exports = debug_router;