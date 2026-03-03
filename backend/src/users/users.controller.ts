import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('seed') // Cette route créera l'utilisateur de test
  createSeed() {
    return this.usersService.createInitialUser();
  }

  @Get() // Cette route affichera tous les utilisateurs
  findAll() {
    return this.usersService.findAll();
  }
}
