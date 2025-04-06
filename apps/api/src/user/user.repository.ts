import { AuthToken } from '@/common/types/payload.interface';
import {
  createAuthTokenQuery,
  createUserQuery,
  deleteAuthTokenByUserIdQuery,
  findAuthTokenByUserIdQuery,
  findUserByIdQuery,
  findUserByPhoneNumberQuery,
  findUserByUsernameQuery,
} from '@/database/queries';
import { CreateUserRequest } from '@/user/dto/create-user.request';
import { CreateUserResponse } from '@/user/dto/create-user.response';
import crypto from 'node:crypto';
import { PoolClient } from 'pg';

export class UserRepository {
  public constructor(private readonly client: PoolClient) {}

  public async create(params: CreateUserRequest): Promise<CreateUserResponse | null> {
    const values = [crypto.randomUUID(), params.username, params.phoneNumber, params.password];

    const result = await this.client.query(createUserQuery, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as CreateUserResponse;
  }

  public async createAuthToken(token: string, expiresAt: Date, userId: string) {
    const values = [crypto.randomUUID(), userId, token, expiresAt];

    const result = await this.client.query(createAuthTokenQuery, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as AuthToken;
  }

  public async findAuthTokenByUserId(userId: string) {
    const result = await this.client.query(findAuthTokenByUserIdQuery, [userId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as AuthToken;
  }

  public async deleteAuthToken(userId: string) {
    await this.client.query(deleteAuthTokenByUserIdQuery, [userId]);
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<CreateUserResponse | null> {
    const result = await this.client.query(findUserByPhoneNumberQuery, [phoneNumber]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as CreateUserResponse;
  }

  public async findById(id: string): Promise<CreateUserResponse | null> {
    const result = await this.client.query(findUserByIdQuery, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as CreateUserResponse;
  }

  public async findByUsername(username: string): Promise<CreateUserResponse | null> {
    const result = await this.client.query(findUserByUsernameQuery, [username]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as CreateUserResponse;
  }
}
