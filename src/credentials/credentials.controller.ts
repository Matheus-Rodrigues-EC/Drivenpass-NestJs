import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { AuthenticatedUser } from '../protocols/authenticated';
import { Guard } from '../guard/guard';
import { UserDecorator } from '../protocols/userDecorator';
import { createCredentialsDTO } from './dtos/createCredentialsDTO';

@UseGuards(Guard)
@Controller('credentials')
export class CredentialsController {
    constructor(private readonly credentialsService: CredentialsService){}

    @Post()
    @HttpCode(201)
    createCredential(@Body() body: createCredentialsDTO, @UserDecorator() user: AuthenticatedUser){
        return this.credentialsService.createCredential(body, user.id);
    }

    @Get()
    @HttpCode(200)
    readCredentials(@UserDecorator() user: AuthenticatedUser){
        return this.credentialsService.readCredentials(user.id);
    }

    @Get(':id')
    @HttpCode(200)
    readCredential(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.credentialsService.readCredential(id, user.id)
    }

    @Delete(':id')
    @HttpCode(204)
    deleteCredential(@Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.credentialsService.deleteCredential(id, user.id);
    }

}
