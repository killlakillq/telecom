import { HttpException } from '@/common/exceptions/http.exception';

export class BadRequestException extends HttpException {
  public constructor(message: string, error: string = 'Bad Request') {
    super(400, message, error);
  }
}
