/**
 * The base error for this application.
 */
export class APIError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Thrown whenever the application fails to find an entity.
 */
export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message);
  }
}
