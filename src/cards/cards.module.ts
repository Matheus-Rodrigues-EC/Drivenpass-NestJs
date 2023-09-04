import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CardHelper } from '../helpers/cardHelper';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [CardsController],
  providers: [CardsService, CardsRepository, CardHelper],
  exports: [CardsService]
})
export class CardsModule {}
