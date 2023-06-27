const invalidPathHandler = (request, response, next) => {
    response.status(404)
    response.send('invalid path')
}

module.exports = invalidPathHandler;