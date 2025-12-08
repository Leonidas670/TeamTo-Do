import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<{
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: number;
        author: string;
        text: string;
        completed: boolean;
        editor: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
