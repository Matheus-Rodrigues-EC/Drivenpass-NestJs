import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDTO } from './dtos/createNoteDTO';
@Injectable()
export class NotesService {
    constructor(private readonly notesRepository: NotesRepository){}

    async createNote(data: CreateNoteDTO, userId: number){
        const note = await this.notesRepository.readNoteTitleId(data.title, userId);
        if(note) throw new HttpException('This Note title already used at your collection', HttpStatus.CONFLICT);

        return await this.notesRepository.createNote(data, userId);
    }

    async readNotes(userId: number){
        return await this.notesRepository.readNotes(userId);
    }

    async readNote(id: number, userId: number){
        const note = await this.notesRepository.readNote(id);
        if(!note) throw new HttpException('Note Not Found', HttpStatus.NOT_FOUND);

        if(note.userId !== userId) throw new HttpException("You don't have acess this note", HttpStatus.FORBIDDEN);

        return note;
    }

    private readNoteTitleId(title: string, userId: number){
        return this.notesRepository.readNoteTitleId(title, userId);
    }

    async deleteNote(id: number, userId: number){
        const note = await this.readNote(id, userId);
        if(!note) throw new HttpException("This note doesn't exists", HttpStatus.NOT_FOUND);

        return this.notesRepository.deleteNote(id, userId);
    }

}
