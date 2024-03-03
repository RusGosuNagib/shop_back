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
      null,
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
    await this.isUserAuthorized(user);

    return {
      email: user.email,
      expiresIn: user.expiresIn,
      secureToken: user.secureToken,
      role: user.role,
      secureTokenExpDate: user.secureTokenExpDate,
    };
  }

  async isUserAuthorized(user: Users): Promise<boolean> {
    const dateNow = new Date(Date.now()).getTime();
    const secureTokenExpDateTime = new Date(user.secureTokenExpDate).getTime();

    const needUpdateSecureToken = !(
      new Date(secureTokenExpDateTime).getTime() -
        new Date(dateNow).getTime() <=
      0
    );
    if (needUpdateSecureToken) {
      await this.generateNewToken(user);
    }
    const findUser = await this.userRepository.findOne({
      email: { $eq: user.email },
    });

    return !!findUser;
  }

  async generateNewToken(user: Users): Promise<Users | boolean> {
    if (!user) {
      return false;
    }
    user.secureToken = CryptoFunctions.generateSecureToken();
    user.secureTokenExpDate = new Date(Date.now() + 7200 * 1000);

    await this.entityManager.persistAndFlush(user);
    return user;
  }

  async validateToken(token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ secureToken: token });
    return !!user;
  }
}
