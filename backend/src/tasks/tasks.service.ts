import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Créer une tâche liée à un utilisateur
  async createTask(title: string, description: string, userId: number) {
    return this.prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
  }

  // Récupérer toutes les tâches d'un utilisateur
  async getUserTasks(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  // Modifier une tâche (ex: changer le titre ou passer le statut en DONE)
  async updateTask(
    id: number,
    data: { title?: string; description?: string; status?: any },
  ) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  // Supprimer une tâche
  async deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
