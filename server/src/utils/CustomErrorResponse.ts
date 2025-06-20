class ErrorResponse extends Error {
  statusCode: number;
  code?: number; // Dodajemo code kao opcionalno svojstvo

  constructor(message: string, statusCode: number, code?: number) {
    super(message);
    this.statusCode = statusCode;
    // Ovde možete dodati `this.status` ili `this.isOperational` ako želite
    // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    // this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
