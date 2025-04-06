import { LoginUserRequest } from '@/auth/dto/login-user.request';
import { RegisterUserRequest } from '@/auth/dto/register-user.request';
import { ExceptionMessage } from '@/common/constants/exception.constant';
import { BadRequestException } from '@/common/exceptions/bad-request.exception';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { UnauthorizedException } from '@/common/exceptions/unauthorized.exception';
import { AuthToken, Payload } from '@/common/types/payload.interface';
import { Crypto } from '@/common/utils/crypto';
import { UserService } from '@/user/user.service';
import config from '@telecom/config';
import jwt, { sign } from 'jsonwebtoken';

export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async login(params: LoginUserRequest): Promise<AuthToken> {
    const user = await this.userService.findByPhoneNumber(params.phoneNumber);

    if (!user) {
      throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
    }

    const password = Crypto.decrypt(user.password);

    if (password !== params.password) {
      throw new UnauthorizedException(ExceptionMessage.INVALID_PASSWORD);
    }

    const payload: Payload = {
      userId: user.id,
      phoneNumber: user.phoneNumber,
    };

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    await this.userService.deleteAuthToken(user.id);

    return this.userService.createAuthToken(token, config.jwt.expiresIn, user.id);
  }

  public async register(params: RegisterUserRequest): Promise<AuthToken> {
    const userByPhoneNumber = await this.userService.findByPhoneNumber(params.phoneNumber);
    const userByUsername = await this.userService.findByUsername(params.username);

    if (userByPhoneNumber || userByUsername) {
      throw new BadRequestException(ExceptionMessage.USER_ALREADY_EXISTS);
    }

    const encryptedPassword = Crypto.encrypt(params.password);

    const newUser = await this.userService.create({
      ...params,
      password: encryptedPassword,
    });

    const payload: Payload = {
      userId: newUser.id,
      phoneNumber: newUser.phoneNumber,
    };

    const token = sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    return this.userService.createAuthToken(token, config.jwt.expiresIn, newUser.id);
  }
}
