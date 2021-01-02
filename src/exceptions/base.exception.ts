/**
 * Base Exception. Other Exceptions should extend this class.
 */
export class BaseException extends Error {
    public readonly name: string;
    public readonly isOperational: boolean | undefined;
    public readonly description: string;
    constructor(name: string, description: string, isOperational: boolean = true) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.description = description;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}