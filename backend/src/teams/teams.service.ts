import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const t = await this.prisma.team.findUnique({ where: { id } });
    if (!t) throw new NotFoundException('Team not found');
    return t;
  }

  async create(dto: CreateTeamDto) {
    return this.prisma.team.create({ data: dto as any });
  }
}
