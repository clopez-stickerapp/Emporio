import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export async function get<T extends TSchema>(
  schema: T,
  endpoint: string,
  headers?: Record<string, string>,
): Promise<Static<T>> {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: headers,
  });
  const json = await response.json();
  if (Value.Check(schema, json)) {
    return json;
  }
  throwError(schema, json);
}

export async function post<T extends TSchema>(
  schema: T,
  endpoint: string,
  body: T,
  headers?: Record<string, string>,
): Promise<Static<T>> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (Value.Check(schema, json)) {
    return json;
  }
  throwError(schema, json);
}

function throwError(schema: TSchema, value: unknown) {
  let message = 'Error in API response:';
  for (const e of Value.Errors(schema, value)) {
    message += `\n * ${e.path}: ${e.message}`;
  }
  message += '\nResponse was:\n' + JSON.stringify(value);
  throw new Error(message);
}
