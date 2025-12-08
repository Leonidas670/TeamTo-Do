import { UsersService } from '../users/users.service';
export declare class AuthController {
    private usersService;
    constructor(usersService: UsersService);
    login(body: {
        name?: string;
        email?: string;
        password: string;
    }): Promise<any>;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<any>;
}
