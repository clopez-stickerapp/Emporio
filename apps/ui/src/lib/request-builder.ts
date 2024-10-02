import type { Static, TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

/**
 * A class that builds requests to be executed.
 */
export class RequestBuilder {
  protected baseURL: string = '';
  protected init: RequestInit = {};
  protected url: string = '';
  protected urlParams: string = '';

  /**
   * @param baseURL The base URL to be used in the requests. Defaults to an empty string.
   */
  public constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  /**
   * Initializes a new request by resetting the instance properties.
   *
   * @returns The current instance of the RequestBuilder.
   */
  public createRequest(): this {
    this.init = {};
    this.url = '';
    this.urlParams = '';

    return this;
  }

  /**
   * Sets the method of the request.
   *
   * @param method The method to be used in the request.
   * @returns The current instance of the RequestBuilder.
   */
  public setMethod(method: 'POST' | 'GET' | 'DELETE' | 'PUT'): this {
    this.init.method = method;

    return this;
  }

  /**
   * Sets the body of the request.
   *
   * @param body The body to be used in the request.
   * @returns The current instance of the RequestBuilder.
   */
  public setBody(body: BodyInit): this {
    this.init.body = body;

    return this;
  }

  /**
   * Sets a header for the request.
   *
   * @param name The name of the header.
   * @param value The value of the header.
   * @returns The current instance of the RequestBuilder.
   */
  public setHeader(name: string, value: string): this {
    ((this.init.headers as Headers) ||= new Headers()).set(name, value);

    return this;
  }

  /**
   * Sets the URL of the request.
   *
   * @param url The URL to be used in the request.
   * @returns The current instance of the RequestBuilder.
   */
  public setURL(url: string): this {
    this.url = url;

    return this;
  }

  /**
   * Sets the URL parameters of the request.
   *
   * @param params The parameters to be used in the URL.
   * @returns The current instance of the RequestBuilder.
   */
  public setURLParams(params: Record<string, unknown>): this {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value !== 'string') {
        params[key] = JSON.stringify(value);
      }
    }

    this.urlParams = '?' + new URLSearchParams(params as Record<string, string>).toString();

    return this;
  }

  /**
   * Executes the request.
   *
   * @param schema The schema to be used to validate the response.
   * @returns The response of the request.
   * @throws An error if the response does not match the schema.
   */
  public async execute<T extends TSchema>(schema: T): Promise<Static<T>> {
    const response = await fetch(this.baseURL + this.url + this.urlParams, this.init);

    const json = await response.json();

    if (Value.Check(schema, json)) {
      return json;
    }

    this.throwError(schema, json);
  }

  protected throwError(schema: TSchema, value: unknown) {
    let message = 'Error in API response:';

    for (const e of Value.Errors(schema, value)) {
      message += `\n * ${e.path}: ${e.message}`;
    }

    message += '\nResponse was:\n' + JSON.stringify(value);

    throw new Error(message);
  }
}
