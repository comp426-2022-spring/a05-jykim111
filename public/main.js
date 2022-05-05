// Focus div based on nav button click

const home = document.getElementById("homenav");
home.addEventListener("click", activeHome);
function activeHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const single = document.getElementById("singlenav");
single.addEventListener("click", activeSingle);
function activeSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const multiple = document.getElementById("multinav");
multiple.addEventListener("click", activeMultiple);
function activeMultiple() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}

const guess = document.getElementById("guessnav");
guess.addEventListener("click", activeGuess);
function activeGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}

// Flip one coin and show coin image to match result when button clicked

// Button coin flip element.
const coin = document.getElementById("coin");
// Add event listener for coin button.
coin.addEventListener("click", singleCoinFlip);

function singleCoinFlip() {
    fetch('http://localhost:5000/app/flip')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            // It is result.flip b/c "json()" returns key/value pair, and the key/value pair in
            // that endpoint is "flip": "heads", so the value in flip will be displayed (head/tails)
            document.getElementById("singleFlipResult").innerHTML = result.flip;
            document.getElementById("smallcoin").setAttribute("src", "./assets/img/" + result.flip + ".png");
            //coin.disabled = true;

        })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Our flip many coins form
const coins = document.getElementById("coins");

// Add event listener for coins form
coins.addEventListener("submit", flipCoins);

// Create the submit handler. The code above goes into this function which is an event.
async function flipCoins(event) {
    // Prevents the default behavior of the browser submitting the form
    // so that we can handle things instead.
    event.preventDefault();

    const endpoint = "app/flip/coins/";

    // document.baseURI gives something that you can then use to build on top of.
    // then add endpoint to url to redirect.
    const url = document.baseURI + endpoint;

    // This gets the element which the event handler was attached to.
    const formEvent = event.currentTarget;

    // const for all_results for image table view.
    const all_results = document.getElementById('all_results');

    try {
        // This takes all the fields in the form and makes their values
        // available through a 'FormData' instance.
        const formData = new FormData(formEvent);

        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = flips.summary.heads;
        document.getElementById("tails").innerHTML = flips.summary.tails;

        // For table view of all results
        let document_fragment = document.createDocumentFragment();

        // In order to reset after a multiple flip.
        while (all_results.firstChild) {
            all_results.removeChild(all_results.firstChild);
            all_results_text.removeChild(all_results_text.firstChild);
        }

        for (let i = 0; i < flips.raw.length; i++) {
            let img = document.createElement('img');
            img.src = "./assets/img/" + flips.raw[i] + ".png";
            img.id = "smallcoin";
            document_fragment.appendChild(img);
            document.getElementById('all_results_text').innerHTML += `<p>${flips.raw[i]}</p>`
        }

        all_results.appendChild(document_fragment);



    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, formData }) {
    /** 
     * We can't pass the 'FormData' instance directly to 'fetch'
     * as that will cause it to automatically format the request
     * body as "multipart" and set the 'Content-Type' request header
     * to 'multipart/form-data'. We want to send the request body
     * as JSON, so we're converting it to a plain object and then
     * into a JSON string.
     */
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);


    const options = {
        /**
         * The default method for a request with fetch is GET,
         * so we must tell it to use POST HTTP method.
         */
        method: "POST",
        /**
         * These headers will be added to the request and tell
         * the API that the request body is JSON and that we can
         * accept JSON responses.
         */
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        /**
         * The body of our POST request is the JSON string that
         * we created above.
         */
        body: formDataJson
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

// Guess a flip by clicking either heads or tails button

/*********************************************************/
/* FOR HEADS BUTTON */
/*********************************************************/

// guess head flip
const heads = document.getElementById('headsButton');

// Add event listener for head button.
heads.addEventListener("click", headsGuess);

// Create submit handler for heads button.
async function headsGuess(event) {
    // Prevent the default behavior of the browser submitting the form.
    event.preventDefault();

    const endpoint = "app/flip/call";

    // document.baseURI gives something that you can use to build on top of.
    const url = document.baseURI + endpoint;

    // This gets the element which the event handler was attached to.
    const formData = { "guess": "heads" };

    try {
        const guess = await sendGuessHeads({ url, formData });
        console.log(guess);

        document.getElementById('userGuess').innerHTML = guess.call;
        document.getElementById('userGuessImg').setAttribute("src", "./assets/img/" + guess.call + ".png");

        document.getElementById('actualGuess').innerHTML = guess.flip;
        document.getElementById('actualGuessImg').setAttribute("src", "./assets/img/" + guess.flip + ".png");

        if (guess.call === guess.flip) {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/win.jpeg");
        } else {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/lose.jpg");
        }
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender.
async function sendGuessHeads({ url, formData }) {
    const formDataJSON = JSON.stringify(formData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJSON
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}
/***********************************************************/
/* Guess Heads Done */
/***********************************************************/


/***********************************************************/
/* FOR TAILS GUESS */
/***********************************************************/

// guess tails flip
const tails = document.getElementById('tailsButton');

// Add event listener for head button.
tails.addEventListener("click", tailsGuess);

// Create submit handler for tails button.
async function tailsGuess(event) {
    // Prevent the default behavior of the browser submitting the form.
    event.preventDefault();

    const endpoint = "app/flip/call";

    // document.baseURI gives something that you can use to build on top of.
    const url = document.baseURI + endpoint;

    // This gets the element which the event handler was attached to.
    const formData = { "guess": "tails" };

    try {
        const guess = await sendGuessTails({ url, formData });
        console.log(guess);

        document.getElementById('userGuess').innerHTML = guess.call;
        document.getElementById('userGuessImg').setAttribute("src", "./assets/img/" + guess.call + ".png");

        document.getElementById('actualGuess').innerHTML = guess.flip;
        document.getElementById('actualGuessImg').setAttribute("src", "./assets/img/" + guess.flip + ".png");

        if (guess.call === guess.flip) {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/win.jpeg");
        } else {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/lose.jpg");
        }
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender.
async function sendGuessTails({ url, formData }) {
    const formDataJSON = JSON.stringify(formData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJSON
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}
/***********************************************************/
/* Guess Tails Done */
/***********************************************************/