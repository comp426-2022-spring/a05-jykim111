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
            document.getElementById("quarter").setAttribute("src", "./assets/img/" + result.flip + ".png");
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

    try {
        // This takes all the fields in the form and makes their values
        // available throught a 'FormData' instance.
        const formData = new FormData(formEvent);

        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.tails;
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
