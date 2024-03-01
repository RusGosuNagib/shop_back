import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './DTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body()
    userData: {
      email: string;
      password: string;
    },
  ) {
    return this.userService.createUser(userData);
  }

  @Post()
  async loginUser(
    @Body()
    userData: {
      email: string;
      password: string;
    },
  ): Promise<CreateUserDto | boolean> {
    return this.userService.authenticateUser(userData.email, userData.password);
  }
}
