import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../prisma.service';
import { EmailService } from '../email.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService, EmailService],
  exports: [TeamsService],
})
export class TeamsModule {}
