import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.simpleTask.findMany({
      orderBy: { createdAt: 'desc' },
      include: { team: { select: { id: true, name: true } } },
    });
  }

  async create(createTaskDto: CreateTaskDto) {
    const { teamId, ...data } = createTaskDto as any;
    return this.prisma.simpleTask.create({
      data: { ...data, teamId: teamId ?? undefined },
      include: { team: { select: { id: true, name: true } } },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const existing = await this.prisma.simpleTask.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Task not found');
    const { teamId, ...data } = updateTaskDto as any;
    const payload: any = { ...data };
    if (teamId !== undefined) payload.teamId = teamId ?? null;
    return this.prisma.simpleTask.update({
      where: { id },
      data: payload,
      include: { team: { select: { id: true, name: true } } },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.simpleTask.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Task not found');
    await this.prisma.simpleTask.delete({ where: { id } });
    return { ok: true };
  }
}
