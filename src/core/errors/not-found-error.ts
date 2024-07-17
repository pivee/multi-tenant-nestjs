export class NotFoundError extends Error {
  constructor(public message = 'Entity not found') {
    super(message);
  }
}
