import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { AddMemberDto } from './dto/add-member.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
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
    create(createTeamDto: CreateTeamDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }>;
    getMembers(id: string): Promise<({
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
    addMember(id: string, dto: AddMemberDto): Promise<{
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
    removeMember(id: string, userId: string): Promise<{
        ok: boolean;
    }>;
    findOne(id: string): Promise<{
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
}
