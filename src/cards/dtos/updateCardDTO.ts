import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDTO } from './createCardDTO';

export class UpdateCardDto extends PartialType(CreateCardDTO) {}