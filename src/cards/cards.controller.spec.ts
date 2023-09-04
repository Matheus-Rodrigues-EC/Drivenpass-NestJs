import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
// import * as request from 'supertest';
// import * as CardFactory from './factories/cardFactory';

describe('Card E2E Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile()

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService);

    await prisma.card.deleteMany();
    await prisma.user.deleteMany();

    await app.init()
  })

  it(``)

})