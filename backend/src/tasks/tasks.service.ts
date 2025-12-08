import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.simpleTask.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.simpleTask.create({ data: createTaskDto as any });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const existing = await this.prisma.simpleTask.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Task not found');
    return this.prisma.simpleTask.update({ where: { id }, data: updateTaskDto as any });
  }

  async remove(id: number) {
    const existing = await this.prisma.simpleTask.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Task not found');
    await this.prisma.simpleTask.delete({ where: { id } });
    return { ok: true };
  }
}
