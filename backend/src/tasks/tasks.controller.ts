import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { userId: number; email: string };
}

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.tasksService.createTask(
      createTaskDto.title,
      createTaskDto.description,
      req.user.userId,
    );
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.tasksService.getUserTasks(req.user.userId);
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
