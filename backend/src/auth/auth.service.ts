import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    // 1. Chercher l'utilisateur par son email
    const user = await this.usersService.findOneByEmail(email);

    // 2. Vérifier si le mot de passe correspond au hash en base
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    // 3. Si c'est faux, on jette une erreur propre
    throw new UnauthorizedException('Identifiants invalides');
  }
}
