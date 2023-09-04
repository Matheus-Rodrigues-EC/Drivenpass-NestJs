import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteDTO } from "./dtos/createNoteDTO";

@Injectable()
export class NotesRepository{
  constructor(private readonly prisma: PrismaService){}

  async createNote(data: CreateNoteDTO, userId: number){
    return await this.prisma.note.create({
      data: {
        ...data,
        userId
      },
      select: {
        id: true,
        title: true,
        text: true
      }
    })
  }

  async readNotes(userId: number){
    return await this.prisma.note.findMany({where: {userId: userId}})
  }

  async readNote(id: number){
    return await this.prisma.note.findUnique({where: {id: id}});
  }

  async readNoteTitleId(title: string, userId: number){
    return await this.prisma.note.findUnique({where: {title_userId: {title, userId}}});
  }

  async deleteNote(id: number, userId: number){
    return await this.prisma.note.delete({where: {id, userId}});
  }

}