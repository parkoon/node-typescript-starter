interface Errors {
    errorField: string;
    errorCode: string;
    errorMessage: string;
}
class AppException extends Error {
    public status: number;
    public message: string;
    public errors?: Errors[];

    constructor(status: number, message: string, errors?: Errors[]) {
        super(message);

        this.status = status;
        this.message = message;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppException;
