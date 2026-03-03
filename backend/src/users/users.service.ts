import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // On injecte Prisma ici
  constructor(private prisma: PrismaService) {}

  async createInitialUser() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('password_securise', saltRounds);
    return this.prisma.user.create({
      data: {
        email: 'test@lifeflow2.com',
        password: hashedPassword, // On hachera ça plus tard pour Thales !
        firstName: 'Toochi',
        lastName: 'Dev',
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}
