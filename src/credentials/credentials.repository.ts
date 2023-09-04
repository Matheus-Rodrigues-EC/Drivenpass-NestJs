import { Injectable } from '@nestjs/common';
import { createCredentialsDTO } from './dtos/createCredentialsDTO';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async createCredential(data: createCredentialsDTO, userId: number){
    return await this.prisma.credential.create({
      data: {
        ...data,
        userId
      },
      select: { 
        id: true, title: true, password: true, url: true, userId: true
      }
    })
  }

  async readCredentialTitleId(title: string, userId: number){
    return await this.prisma.credential.findUnique({where: {title_userId: {title: title, userId: userId}}});
  }

  async readCredentials(userId: number){
    return await this.prisma.credential.findMany({where: {userId: userId}});
  }

  async readCredential(id: number){
    return await this.prisma.credential.findUnique({where: {id: id}});
  }

  async deleteCredential(id: number, userId: number){
    return await this.prisma.credential.delete({where: {id: id, userId: userId}});
  }

}