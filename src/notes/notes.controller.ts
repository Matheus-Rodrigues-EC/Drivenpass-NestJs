import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthenticatedUser } from '../protocols/authenticated';
import { Guard } from '../guard/guard';
import { UserDecorator } from '../protocols/userDecorator';
import { CreateNoteDTO } from './dtos/createNoteDTO';

@UseGuards(Guard)
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Post()
    @HttpCode(201)
    createNote(@Body() body: CreateNoteDTO, @UserDecorator() user: AuthenticatedUser){
        return this.notesService.createNote(body, user.id);
    }

    @Get()
    @HttpCode(200)
    readNotes(@UserDecorator() user: AuthenticatedUser){
        return this.notesService.readNotes(user.id);
    }

    @Get(':id')
    @HttpCode(200)
    readNote(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.notesService.readNote(id, user.id);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteNote(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.notesService.deleteNote(id, user.id);
    }

}
