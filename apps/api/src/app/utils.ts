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

export function throwIfError<T>( fn: () => T, errorType: new (mmessage: string) => any ): T{
	  try {
	return fn();
  } catch (error) {
	throw new errorType((error as Error).message);
  }
}