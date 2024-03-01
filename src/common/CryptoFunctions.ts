import * as crypto from 'node:crypto';

export class CryptoFunctions {
  static md5(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
  }

  static generateSecureToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  static comparePasswordToMD5(input: string, hash: string): boolean {
    const encryptedInput = crypto.createHash('md5').update(input).digest('hex');
    return encryptedInput === hash;
  }
}
