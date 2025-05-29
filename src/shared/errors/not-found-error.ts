export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Entity not found');
    this.name = 'NotFoundError';
  }
}
