 class expressError extends Error {
    constructor(status , message , data) {
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = expressError;