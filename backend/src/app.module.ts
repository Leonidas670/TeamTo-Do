import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [TasksModule, UsersModule, TeamsModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
