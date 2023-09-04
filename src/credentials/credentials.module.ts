import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { CredentialsRepository } from './credentials.repository';
import { CredentialHelper } from '../helpers/credentialsHelper';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, CredentialHelper]
})
export class CredentialsModule {}
