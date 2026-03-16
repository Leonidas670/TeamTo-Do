import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { EmailService } from '../email.service';
export declare class TeamsService {
    private prisma;
    private emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    findAll(): Promise<({
        members: ({
            user: {
                id: number;
                name: string;
                email: string;
            };
        } & {
            id: number;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: number;
            teamId: number;
        })[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        members: ({
            user: {
                id: number;
                name: string;
                email: string;
            };
        } & {
            id: number;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: number;
            teamId: number;
        })[];
    } & {
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreateTeamDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMembers(teamId: number): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        role: import(".prisma/client").$Enums.TeamRole;
        userId: number;
        teamId: number;
    })[]>;
    addMember(teamId: number, dto: AddMemberDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        role: import(".prisma/client").$Enums.TeamRole;
        userId: number;
        teamId: number;
    }>;
    removeMember(teamId: number, userId: number): Promise<{
        ok: boolean;
    }>;
}
