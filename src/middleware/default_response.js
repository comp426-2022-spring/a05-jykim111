// Default response for any other request.
function default_response(req, res) {
    res.status(404).send('404 NOT FOUND');
    res.type("text/plain");
}

module.exports = {
    default_response: default_response
}