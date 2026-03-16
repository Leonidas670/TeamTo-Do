import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { EmailService } from '../email.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService, private emailService: EmailService) {}

  async findAll() {
    return this.prisma.team.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const t = await this.prisma.team.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });
    if (!t) throw new NotFoundException('Team not found');
    return t;
  }

  async create(dto: CreateTeamDto) {
    return this.prisma.team.create({ data: dto as any });
  }

  async getMembers(teamId: number) {
    await this.findOne(teamId);
    return this.prisma.teamMember.findMany({
      where: { teamId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async addMember(teamId: number, dto: AddMemberDto) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');

    const email = dto.email.trim().toLowerCase();
    const users = await this.prisma.user.findMany();
    const user = users.find((u) => u.email.toLowerCase() === email);
    if (!user) throw new NotFoundException('Usuario no encontrado con ese correo');

    const existing = await this.prisma.teamMember.findFirst({
      where: { teamId, userId: user.id },
    });
    if (existing) throw new BadRequestException('Ese usuario ya pertenece al equipo');

    const role = dto.role === 'ADMIN' ? 'ADMIN' : 'MEMBER';
    const member = await this.prisma.teamMember.create({
      data: { teamId, userId: user.id, role },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    // Enviar email de invitación
    const inviter = await this.prisma.user.findUnique({ where: { id: dto.inviterId } });
    if (inviter) {
      await this.emailService.sendInvitationEmail(user.email, team.name, inviter.name);
    }

    return member;
  }

  async removeMember(teamId: number, userId: number) {
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');

    const member = await this.prisma.teamMember.findFirst({
      where: { teamId, userId },
    });
    if (!member) throw new NotFoundException('Miembro no encontrado en el equipo');

    await this.prisma.teamMember.delete({ where: { id: member.id } });
    return { ok: true };
  }
}
