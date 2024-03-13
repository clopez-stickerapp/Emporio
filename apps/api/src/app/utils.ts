export class NotFoundError extends Error { }
export class BadRequestError extends Error { }

export function throwNotFound(): never {
  throw new NotFoundError();
}
export function throwBadRequest(): never {
  throw new BadRequestError();
}
export function assertUnreachable(_: never): never {
  throw new Error('Unreachable code reached')
}