class ErrorResponse extends Error {
    statusCode;
    code; // Dodajemo code kao opcionalno svojstvo
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        // Ovde možete dodati `this.status` ili `this.isOperational` ako želite
        // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        // this.isOperational = true;
        // Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorResponse;
