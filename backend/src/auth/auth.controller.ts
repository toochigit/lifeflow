import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // Par défaut un POST renvoie 201, on préfère 200 pour un login
  @Post('login')
  signIn(@Body() signInDto: { email: string; pass: string }) {
    return this.authService.login(signInDto.email, signInDto.pass);
  }
}
