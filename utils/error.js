const { StatusCodes } = require('http-status-codes');

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = StatusCodes.NOT_FOUND;
        this.customError = true;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
        this.code = StatusCodes.UNAUTHORIZED;
        this.customError = true;
    }
}

class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalError';
        this.code = StatusCodes.INTERNAL_SERVER_ERROR;
        this.customError = true;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.code = StatusCodes.BAD_REQUEST;
        this.customError = true;
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.code = StatusCodes.CONFLICT;
        this.customError = true;
    }
}

module.exports = {
    NotFoundError,
    AuthenticationError,
    InternalError,
    BadRequestError,
    ConflictError,
};