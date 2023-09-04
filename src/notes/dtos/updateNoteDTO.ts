import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDTO } from './createNoteDTO';

export class UpdateNoteDto extends PartialType(CreateNoteDTO) {}