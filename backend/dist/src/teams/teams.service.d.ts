import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
export declare class TeamsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        members: ({
            user: {
                id: number;
                name: string;
                email: string;
            };
        } & {
            id: number;
            teamId: number;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
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
            teamId: number;
            role: import(".prisma/client").$Enums.TeamRole;
            userId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    create(dto: CreateTeamDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    getMembers(teamId: number): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        teamId: number;
        role: import(".prisma/client").$Enums.TeamRole;
        userId: number;
    })[]>;
    addMember(teamId: number, dto: AddMemberDto): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
        };
    } & {
        id: number;
        teamId: number;
        role: import(".prisma/client").$Enums.TeamRole;
        userId: number;
    }>;
    removeMember(teamId: number, userId: number): Promise<{
        ok: boolean;
    }>;
}
