import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService: thin wrapper around PrismaClient for NestJS.
 * Composes (rather than extends) PrismaClient to avoid constructor issues with Prisma v7.
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    // Simple instantiation with errorFormat
    // Prisma reads DATABASE_URL from .env automatically
    this.prisma = new PrismaClient({ 
      errorFormat: 'pretty'
    });
  }

  // Expose Prisma model methods and properties
  get simpleTask() {
    return this.prisma.simpleTask;
  }

  get user() {
    return this.prisma.user;
  }

  get team() {
    return this.prisma.team;
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}

