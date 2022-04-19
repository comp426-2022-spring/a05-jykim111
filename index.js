// Require express
const express = require('express')

// Define express using variable "app"
const app = express();

// Define coin_routes
const coin_router = require('./src/routes/coin_routes');

// Define debug_routes
const debug_router = require('./src/routes/debug_route');

// Call db_middlware function.
const database = require('./src/middleware/db_middleware');

// Default response middleware
const default_response = require('./src/middleware/default_response');

// Require morgan
const morgan = require('morgan');

// Require fs
const fs = require('fs');

// Require minimist module
const args = require('minimist')(process.argv.slice(2));

// Store help text
const help = (`
    server.js [options]
    
    --port  Set the port number for the server to listen on. Must be an integer between 1 and 65535.
    
    --debug If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws
                an error with the message "Error test successful." Defaults to false.
                
    --log   If set to false, no log files are written. Defaults to true. Logs are always written to
                database.
    
    --help  Return this message and exit.
`)

// If --help or -h, echo help text to STDOUT and exit.
if (args.help || args.h) {
    console.log(help);
    process.exit(0);
}

// Parameters args are taking in.
args['port', 'debug', 'log', 'help'];

// Initializing port number for the server
const port = args.port || process.env.PORT || 5000;

// Initializing debug variable for args.debug
const debug = args.debug;

// Initializing log variable for args.log
const log = args.log;

// Serve static HTML files
app.use(express.static('./public'));

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));

// Allow JSON body messages on all endpoints.
app.use(express.json());


// Use morgan for logging to files (ONLY IF --log = true)
if (log == true) {
    // Create a write stream to append (flags: 'a') to a file
    const access_log = fs.createWriteStream('access.log', { flags: 'a' });

    // Set up the access logging middleware
    app.use(morgan('combined', { stream: access_log }));
}


// Calling middleware function that inserts a new record in a database.
app.use(database.log_middlware);


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port));
})


// WHEN DEBUG == TRUE.
if (debug) {
    app.use('/app', debug_router);
}


// Pass in all the coin_routes into index.js
app.use('/app', coin_router);


// Default response for any other request.
app.use(default_response.default_response);


// STDOUT sever has stopped.
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server has stopped');
    })
})