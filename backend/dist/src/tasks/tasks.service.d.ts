import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        team: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        teamId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(createTaskDto: CreateTaskDto): Promise<{
        team: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        teamId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        team: {
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        teamId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        ok: boolean;
    }>;
}
