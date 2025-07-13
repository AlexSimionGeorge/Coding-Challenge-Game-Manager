import { IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  imageUrl!: string;
}
