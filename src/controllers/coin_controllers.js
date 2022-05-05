// The files in this directory contain functions that handle requests coming to different routes

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

/** Export 
 * 
 * Export all of your named functions
*/
module.exports = {
    coinFlip: coinFlip,
    coinFlips: coinFlips,
    countFlips: countFlips,
    flipACoin: flipACoin
};
