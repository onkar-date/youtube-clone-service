const errorHandler = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')

    const status = err.status || 400
    res.status(status).send(err.message)
}

module.exports = errorHandler;