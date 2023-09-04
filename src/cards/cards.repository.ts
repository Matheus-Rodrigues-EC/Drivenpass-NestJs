import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDTO } from './dtos/createCardDTO';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService){}

  async createCard(data: CreateCardDTO, userId: number){
    const cardsTypes = data.type;
    delete data.type;

    return await this.prisma.card.create({
      data: {
        ...data,
        userId,
        CardType: {
          connect: cardsTypes.map((id) => ({
            id
          }))
        }
      },
      select: {
        id: true,
        title: true,
        number: true,
        owner: true, 
        cvv: true,
        expiration: true,
        password: true, 
        userId: true,
        CardType: {
          select: {
            type: true
          }
        }
      }
    })
  };

  async readCards(userId: number){
    return await this.prisma.card.findMany({
      where: { userId },
      include: {
        CardType: {
          select: { type: true },
        },
      }
    })
  };

  async readCard(id: number){
    return await this.prisma.card.findUnique({
      where: { id },
      include: {
        CardType: {
          select: { type: true },
        },
      }
    })
  };

  async readCardTitleId(title: string, userId: number){
    return await this.prisma.card.findUnique({where: { title_userId: { title: title, userId: userId}}});
  }

  async deleteCard(id: number, userId: number){
    return await this.prisma.card.delete({where: { id: id, userId: userId}})
  }

}
