import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }>;
    findByName(name: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    } | null>;
    create(dto: CreateUserDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }>;
}
