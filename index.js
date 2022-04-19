// Place your server entry point code here
/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

function coinFlip() {
    let result;
    let flip = Math.random();

    if (flip < 0.5) {
        result = "heads";
    } else {
        result = "tails";
    }

    return result;
}

/** Multiple coin flips
 * 
 * Write a function that accepts one parameter (number of flips) and returns an array of 
 * resulting "heads" or "tails".
 * 
 * @param {number} flips 
 * @returns {string[]} results
 * 
 * example: coinFlips(10)
 * returns:
 *  [
      'heads', 'heads',
      'heads', 'tails',
      'heads', 'tails',
      'tails', 'heads',
      'tails', 'heads'
    ]
 */

function coinFlips(flips) {
    let coinArray = [];

    for (let i = 0; i < flips; i++) {
        coinArray.push(coinFlip());
    }

    return coinArray;
}

/** Count multiple flips
 * 
 * Write a function that accepts an array consisting of "heads" or "tails" 
 * (e.g. the results of your `coinFlips()` function) and counts each, returning 
 * an object containing the number of each.
 * 
 * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
 * { tails: 5, heads: 5 }
 * 
 * @param {string[]} array 
 * @returns {{ heads: number, tails: number }}
 */

function countFlips(array) {
    let tailsCount = 0;
    let headsCount = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] == 'heads') {
            headsCount++;
        } else {
            tailsCount++;
        }
    }

    return {
        'tails': tailsCount,
        'heads': headsCount
    };

}

/** Flip a coin!
 * 
 * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
 * 
 * @param {string} call 
 * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
 * 
 * example: flipACoin('tails')
 * returns: { call: 'tails', flip: 'heads', result: 'lose' }
 */

function flipACoin(call) {
    let result;
    let flip = coinFlip();
    if (call == flip) {
        result = 'win';
    } else {
        result = 'lose';
    }

    let game = {
        'call': call,
        'flip': flip,
        'result': result
    };

    return game;

}

/* START OF a04 */

// Require express
const express = require('express')

// Define express using variable "app"
const app = express();

// Call db_middlware function.
const database = require('./src/middleware/db.middleware');

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


// Use morgan for logging to files
// ONLY IF --log = true
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
    // endpoint for /app/log/access that returns all records in "accesslog" table in "log.db"
    app.get('/app/log/access', (req, res) => {
        try {
            const statement = database.prepare('SELECT * FROM accesslog').all();
            res.status(200).json(statement);
        } catch (e) {
            console.error(e);
        }
    })

    // endpoint for /app/error if there is an error.
    app.get('/app/error', (req, res) => {
        throw new Error('Error test successful.');
    })
}


// Define check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200.
    res.statusCode = 200; // Can use res.status(200).end('OK');
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
});

app.post('/app/flip/coins/', (req, res, next) => {
    const flips = coinFlips(req.body.number);
    const count = countFlips(flips);
    res.status(200).json({ "raw": flips, "summary": count });
})


// Define response for coinFlip.
app.get('/app/flip/', (req, res) => {
    let flip = coinFlip();
    res.status(200).json({ "flip": flip });
});

// Define response for coinFlips with given number.
app.get('/app/flips/:number', (req, res) => {
    let raw = coinFlips(req.params.number);
    let summary = countFlips(raw);
    res.status(200).json({ "raw": raw, "summary": summary });
});


// Define response for call.
app.post('/app/flip/call/', (req, res, next) => {
    const game = flipACoin(req.body.guess);
    res.status(200).json(game);
})

// Define response for heads call.
app.get('/app/flip/call/heads', (req, res) => {
    let heads = flipACoin('heads');
    let call = heads.call;
    let flip = heads.flip;
    let result = heads.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
});


// Define response for tails call.
app.get('/app/flip/call/tails', (req, res) => {
    let tails = flipACoin('tails');
    let call = tails.call;
    let flip = tails.flip;
    let result = tails.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
});

// Define response for Guessing heads or tails.
app.get('/app/flip/call/:guess(heads|tails)/', (req, res, next) => {
    const game = flipACoin(req.params.guess);
    res.status(200).json(game);
})


// Default response for any other request.
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND');
    res.type("text/plain");
});

// STDOUT sever has stopped.
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server has stopped');
    })
})