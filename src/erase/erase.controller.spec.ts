import { Test, TestingModule } from '@nestjs/testing';
import { EraseController } from './erase.controller';

describe('EraseController', () => {
  let controller: EraseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EraseController],
    }).compile();

    controller = module.get<EraseController>(EraseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
