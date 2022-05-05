// Database Middleware

// Require database SCRIPT file
const database = require('../services/database.js');

// Middlware function that inserts a new record in a database.
function log_middleware(req, res, next) {
    // data objects for database.
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers[' referer '],
        useragent: req.headers[' user-agent ']
    };

    // CREATE new records into a database
    const statement = database.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

    // Executes the prepared statement. When execution completes, it returns info object.
    const info = statement.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method,
        logdata.url, logdata.protocol, logdata.httpversion, logdata.status,
        logdata.referer, logdata.useragent);

    // next() to avoid hang.
    next();
}

module.exports = {
    log_middlware: log_middleware
}