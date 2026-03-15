"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TeamsService = class TeamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async findOne(id) {
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
        if (!t)
            throw new common_1.NotFoundException('Team not found');
        return t;
    }
    async create(dto) {
        return this.prisma.team.create({ data: dto });
    }
    async getMembers(teamId) {
        await this.findOne(teamId);
        return this.prisma.teamMember.findMany({
            where: { teamId },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async addMember(teamId, dto) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        const email = dto.email.trim().toLowerCase();
        const users = await this.prisma.user.findMany();
        const user = users.find((u) => u.email.toLowerCase() === email);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado con ese correo');
        const existing = await this.prisma.teamMember.findFirst({
            where: { teamId, userId: user.id },
        });
        if (existing)
            throw new common_1.BadRequestException('Ese usuario ya pertenece al equipo');
        const role = dto.role === 'ADMIN' ? 'ADMIN' : 'MEMBER';
        return this.prisma.teamMember.create({
            data: { teamId, userId: user.id, role },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async removeMember(teamId, userId) {
        const team = await this.prisma.team.findUnique({ where: { id: teamId } });
        if (!team)
            throw new common_1.NotFoundException('Team not found');
        const member = await this.prisma.teamMember.findFirst({
            where: { teamId, userId },
        });
        if (!member)
            throw new common_1.NotFoundException('Miembro no encontrado en el equipo');
        await this.prisma.teamMember.delete({ where: { id: member.id } });
        return { ok: true };
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map