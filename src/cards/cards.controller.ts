import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthenticatedUser } from '../protocols/authenticated';
import { Guard } from '../guard/guard';
import { UserDecorator } from '../protocols/userDecorator';
import { CreateCardDTO } from './dtos/createCardDTO';

@UseGuards(Guard)
@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService){}

    @Post()
    @HttpCode(201)
    createCard(@Body() body: CreateCardDTO, @UserDecorator() user: AuthenticatedUser){
        return this.cardsService.createCard(body, user.id)
    }

    @Get()
    @HttpCode(200)
    readCards(@UserDecorator() user: AuthenticatedUser){
        return this.cardsService.readCards(user.id);
    }
    
    @Get(':id')
    @HttpCode(200)
    readCard(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.cardsService.readCard(id, user.id);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteCard(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.cardsService.deleteCard(id, user.id);
    }

}
