import { HttpException } from '@/common/exceptions/http.exception';

export class UnauthorizedException extends HttpException {
  public constructor(message: string, error: string = 'Unauthorized') {
    super(401, message, error);
  }
}
