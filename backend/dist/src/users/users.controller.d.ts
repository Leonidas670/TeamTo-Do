import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        password: string;
        avatarUrl: string | null;
    }>;
}
