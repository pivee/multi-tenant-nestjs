export class ConflictError extends Error {
  constructor(public message = 'Entity already exists') {
    super(message);
  }
}
