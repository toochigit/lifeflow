import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: { title: string; description: string; userId: number }) {
    return this.tasksService.createTask(
      body.title,
      body.description,
      body.userId,
    );
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.tasksService.getUserTasks(+userId); // Le + convertit le texte en nombre
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; status?: any },
  ) {
    return this.tasksService.updateTask(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.deleteTask(+id);
  }
}
