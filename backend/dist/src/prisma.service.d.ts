import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    private prisma;
    constructor();
    get simpleTask(): import(".prisma/client").Prisma.SimpleTaskDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    get user(): import(".prisma/client").Prisma.UserDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    get team(): import(".prisma/client").Prisma.TeamDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
