import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Le titre est trop court (min 3 caractères)' })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
