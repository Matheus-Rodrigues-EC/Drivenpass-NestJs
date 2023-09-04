import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { CredentialHelper } from '../helpers/credentialsHelper';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, CredentialHelper],
  exports: [CredentialsService]
})
export class CredentialsModule {}
