import ErrorResponse from "../utils/CustomErrorResponse.js";
import { Error as MongooseError } from "mongoose"; // Ako koristite Mongoose
export const errorHandler = (err, req, res, next) => {
    let error = {
        message: err.message || "Unknown error",
    };
    // Ako je greška tipa ErrorResponse, uzimamo odgovarajući statusCode i message
    if (err instanceof ErrorResponse) {
        error = err; // Greška ima statusCode
    }
    else if (err instanceof MongooseError.ValidationError) {
        // Ako je Mongoose ValidationError, obradjujemo errors
        const message = Object.values(err.errors)
            .map((item) => item.message) // mapiranje grešaka na njihove poruke
            .join(", ");
        error = new ErrorResponse(message, 400);
    }
    else if (err instanceof Error) {
        // Ako je standardna greška (Error) koja nema statusCode
        error.message = err.message;
        error.statusCode = 500; // Ako nema statusCode, postavljamo 500
    }
    else {
        // Ako je to običan objekat, postavljamo message i statusCode
        error.message = err.message;
        error.statusCode = err.statusCode || 500; // Ako nema statusCode, postavljamo 500
    }
    // Specifična obrada greške sa MongoDB kodom duplikata (code 11000)
    if (err instanceof ErrorResponse && err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400, 11000);
    }
    // Slanje odgovora sa status kodom greške i porukom
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server error",
    });
};
