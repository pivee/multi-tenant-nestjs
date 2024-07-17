export class UnauthorizedError extends Error {
  constructor(public message = 'Unauthorized') {
    super(message);
  }
}
