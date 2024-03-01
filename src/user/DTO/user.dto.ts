export class UserDto {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly expiresIn: number;
  readonly secureToken: string;
  readonly role: number;
}
