// Default response for any other request.
function default_route(req, res) {
    res.status(404).send('404 NOT FOUND');
    res.type("text/plain");
}

module.exports = {
    default_route: default_route
}