import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: { name?: string; email?: string; password: string }) {
    const { name, email, password } = body;
    let user;
    if (email) user = await this.usersService.findAll().then((u) => u.find((x) => x.email === email));
    else if (name) user = await this.usersService.findByName(name);

    if (!user || user.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Return user object without password
    const { password: _p, ...rest } = user as any;
    return rest;
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const existing = await this.usersService.findAll().then((u) => u.find((x) => x.email === body.email || x.name === body.name));
    if (existing) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const created = await this.usersService.create(body as any);
    const { password: _p, ...rest } = created as any;
    return rest;
  }
}
