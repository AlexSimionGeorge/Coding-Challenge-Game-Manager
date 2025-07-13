import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = await this.prisma.game.create({
      data: createGameDto,
    });
    return game;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.prisma.game.findMany();
    return games;
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    // Ensure the game exists before updating
    await this.findOne(id);

    const updatedGame = await this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
    return updatedGame;
  }

  async remove(id: number): Promise<Game> {
    // Ensure the game exists before deleting
    await this.findOne(id);

    const deletedGame = await this.prisma.game.delete({
      where: { id },
    });
    return deletedGame;
  }
}
