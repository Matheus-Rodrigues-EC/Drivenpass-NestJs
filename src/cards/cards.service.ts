import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CardHelper } from '../helpers/cardHelper';
import { CreateCardDTO } from './dtos/createCardDTO';

@Injectable()
export class CardsService {
    constructor(
        private readonly cardsRepository: CardsRepository,
        private readonly cardHelper: CardHelper
    ){}

    async createCard(data: CreateCardDTO, userId: number){
        const card = await this.cardsRepository.readCardTitleId(data.title, userId);
        if(card) throw new HttpException('This card title already used at your collection', HttpStatus.CONFLICT);

        const cardDTO: CreateCardDTO = this.cardHelper.encryptCard(data);

        return this.cardsRepository.createCard(cardDTO, userId);
    }

    async readCards(userId: number){
        const cardList = await this.cardsRepository.readCards(userId);

        return cardList.map((card) => this.cardHelper.decryptCard(card));
    }

    async readCard(id: number, userId: number){
        const card = await this.cardsRepository.readCard(id);
        if(!card) throw new HttpException('Card not found!', HttpStatus.NOT_FOUND);

        if(card.userId !== userId) throw new HttpException("You don't have acess this credential", HttpStatus.FORBIDDEN)

        return this.cardHelper.decryptCard(card);
    }

    private readCardTitleId(title: string, userId: number){
        return this.cardsRepository.readCardTitleId(title, userId);
    }

    async deleteCard(id: number, userId: number){
        const card = await this.readCard(id, userId);
        if(!card) throw new HttpException("This card doesn't exists", HttpStatus.NOT_FOUND);

        return await this.cardsRepository.deleteCard(id, userId);
    }

}
