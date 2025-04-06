export class HttpException extends Error {
  public constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly error: string,
  ) {
    super(message);
  }
}
