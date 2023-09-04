import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule.register({secret: process.env.JWT_SECRET}), PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}
