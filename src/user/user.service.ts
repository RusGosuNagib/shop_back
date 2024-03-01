import { Injectable } from '@nestjs/common';
import { Users } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CryptoFunctions } from '../common/CryptoFunctions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: EntityRepository<Users>,
    private readonly entityManager: EntityManager,
  ) {}

  async createUser(userData: {
    email: string;
    password: string;
  }): Promise<Users | boolean> {
    const exists = await this.userRepository.count({
      email: { $eq: userData.email },
    });
    if (exists) {
      return false;
    }
    const stringForHash = userData.email + userData.password;
    const encryptedPassword = CryptoFunctions.md5(stringForHash);
    const secureToken = CryptoFunctions.generateSecureToken();
    const user = new Users(
      userData.email,
      encryptedPassword,
      0,
      7200,
      secureToken,
    );

    await this.entityManager.persistAndFlush(user);
    return user;
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<any | boolean> {
    const stringForHash = email + password;
    const encryptedPassword = CryptoFunctions.md5(stringForHash);
    const user = await this.userRepository.findOne({
      email,
      password: encryptedPassword,
    });
    if (!user) {
      return false;
    }
    return {
      email: user.email,
      expiresIn: user.expiresIn,
      secureToken: user.secureToken,
      role: user.role,
    };
  }
}
