import { HttpException } from '@/common/exceptions/http.exception';

export class NotFoundException extends HttpException {
  public constructor(message: string, error: string = 'Not Found') {
    super(404, message, error);
  }
}
