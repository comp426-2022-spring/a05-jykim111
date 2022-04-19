// Route (endpoint) definitions go in this directory

// Define check endpoint
function status(req, res) {
    // Respond with status 200.
    res.statusCode = 200; // Can use res.status(200).end('OK');
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
}

// Define function for multiple coin flips
function multiple_coins(req, res, next) {
    const flips = coinFlips(req.body.number);
    const count = countFlips(flips);
    res.status(200).json({ "raw": flips, "summary": count });
}


// Define response for coinFlip.
function coin_flip(req, res) {
    let flip = coinFlip();
    res.status(200).json({ "flip": flip });
}

// Define response for coinFlips with given number.
function number_coin_flip(req, res) {
    let raw = coinFlips(req.params.number);
    let summary = countFlips(raw);
    res.status(200).json({ "raw": raw, "summary": summary });
}


// Define response for call.
function flip_call(req, res, next) {
    const game = flipACoin(req.body.guess);
    res.status(200).json(game);
}


// Define response for heads call.
function head_call(req, res) {
    let heads = flipACoin('heads');
    let call = heads.call;
    let flip = heads.flip;
    let result = heads.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}


// Define response for tails call.
function tail_call(req, res) {
    let tails = flipACoin('tails');
    let call = tails.call;
    let flip = tails.flip;
    let result = tails.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}


// Define response for Guessing heads or tails.
function guess_flip(req, res, next) {
    const game = flipACoin(req.params.guess);
    res.status(200).json(game);
}

module.exports = {
    status: status,
    multiple_coins: multiple_coins,
    coin_flip: coin_flip,
    number_coin_flip: number_coin_flip,
    flip_call: flip_call,
    head_call: head_call,
    tail_call: tail_call,
    guess_flip: guess_flip
}