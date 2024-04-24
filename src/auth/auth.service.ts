import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    userName: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ userName });
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
