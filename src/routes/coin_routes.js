// Route (endpoint) definitions go in this directory

// Define express
const express = require('express');

// Define router object that is an instance used extensively for express.
const coin_router = express.Router();

// Import middleware to use for the routes.
const flip_middleware = require('../middleware/flip_middleware');

// Define check endpoint
coin_router.get('/', flip_middleware.status);

// Define router for multiple coin flips.
coin_router.post('/flip/coins/', flip_middleware.multiple_coins);


// Define router for coinFlip.
coin_router.get('/flip/', flip_middleware.coin_flip);

// Define response for coinFlips with given number.
coin_router.get('/flips/:number', flip_middleware.number_coin_flip);


// Define response for call.
coin_router.post('/flip/call/', flip_middleware.flip_call);

// Define response for heads call.
coin_router.get('/flip/call/heads', flip_middleware.head_call);


// Define response for tails call.
coin_router.get('/flip/call/tails', flip_middleware.tail_call);

// Define response for Guessing heads or tails.
coin_router.get('/flip/call/:guess(heads|tails)/', flip_middleware.guess_flip);


module.exports = coin_router;