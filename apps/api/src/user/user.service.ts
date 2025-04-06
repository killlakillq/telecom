import { ExceptionMessage } from '@/common/constants/exception.constant';
import { NotFoundException } from '@/common/exceptions/not-found.exception';
import { CreateUserRequest } from '@/user/dto/create-user.request';
import { CreateUserResponse } from '@/user/dto/create-user.response';
import { UserRepository } from '@/user/user.repository';

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async create(params: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userRepository.create(params);
  }

  public async createAuthToken(token: string, expiresIn: number, userId: string) {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    return this.userRepository.createAuthToken(token, expiresAt, userId);
  }

  public async findAuthTokenByUserId(userId: string) {
    return this.userRepository.findAuthTokenByUserId(userId);
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<CreateUserResponse | null> {
    return this.userRepository.findByPhoneNumber(phoneNumber);
  }

  public async findByUsername(username: string): Promise<CreateUserResponse | null> {
    return this.userRepository.findByUsername(username);
  }

  public async findById(id: string): Promise<CreateUserResponse | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(ExceptionMessage.USER_NOT_FOUND);
    }

    return user;
  }

  public async deleteAuthToken(userId: string) {
    return this.userRepository.deleteAuthToken(userId);
  }
}
