import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dtos/createUserDTO';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: createUserDTO){
      return await this.prisma.user.create({
        data: {
          ...data,
          password: bcrypt.hashSync(data.password, 10),
        },
        select:{
          id: true,
          username: true,
          email: true
        }
      });
    }

    async readUsers(){
      return await this.prisma.user.findMany();
    }

    async readUserEmail(email: string){
      return await this.prisma.user.findUnique({where: {email: email}});
    }

    async readUserId(id: number){
      return await this.prisma.user.findUnique({where: {id: id}});
    }

    async deleteUserData(userId: number){
      return this.prisma.$transaction([
        this.prisma.credential.deleteMany({where: {userId: userId}}),
        this.prisma.note.deleteMany({where: {userId: userId}}),
        this.prisma.card.deleteMany({where: {userId: userId}}),
        this.prisma.user.deleteMany({where: {id: userId}})
      ])
    }

  }