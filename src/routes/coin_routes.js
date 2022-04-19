// Route (endpoint) definitions go in this directory

// Define express
const express = require('express');

// Define router object that is an instance used extensively for express.
const router = express.Router();

// Import middleware to use for the routes.
const flip_middleware = require('../middleware/flip_middleware');

// Define check endpoint
router.get('/', flip_middleware.status);

// Define router for multiple coin flips.
router.post('/flip/coins/', flip_middleware.multiple_coins);


// Define router for coinFlip.
router.get('/flip/', flip_middleware.coin_flip);

// Define response for coinFlips with given number.
router.get('/flips/:number', flip_middleware.number_coin_flip);


// Define response for call.
router.post('/flip/call/', flip_middleware.flip_call);

// Define response for heads call.
router.get('/flip/call/heads', flip_middleware.head_call);


// Define response for tails call.
router.get('/flip/call/tails', flip_middleware.tail_call);

// Define response for Guessing heads or tails.
router.get('/flip/call/:guess(heads|tails)/', flip_middleware.guess_flip);


module.exports = coin_router;