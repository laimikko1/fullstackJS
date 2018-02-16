const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    if (request.get('authorization') !== undefined) {
        const authorization = request.get('authorization')
        if (authorization && authorization.toLowerCase().startsWith('bearer '))
            request.token = authorization.substring(7)
    }
    next()
}

module.exports = {
    logger, tokenExtractor
}