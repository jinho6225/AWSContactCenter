const Responses = {
    _400(data = {}) {
        return {
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }
}

module.exports = Responses;