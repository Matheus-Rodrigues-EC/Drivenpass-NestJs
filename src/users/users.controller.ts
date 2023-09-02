import {
Controller, Post, Body, HttpCode, Delete, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDTO } from './dtos/createUserDTO';
import { loginUserDTO } from './dtos/loginUserDTO';
import { AuthenticatedUser } from '../protocols/authenticated';
import { UserDecorator } from '../protocols/userDecorator';
import { Guard } from '../guard/guard';
import { deleteUserDTO } from './dtos/deleteUserDTO';

// import { AuthGuard } from '../guards/auth.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Post('/auth/sign-up')
    @HttpCode(201)
    signUp(@Body() body: createUserDTO){
        return this.usersService.createUser(body);
    }

    @Post('/auth/sign-in')
    @HttpCode(200)
    signIn(@Body() body: loginUserDTO){
        return this.usersService.loginUser(body);
    }

    @UseGuards(Guard)
    @Delete(':id')
    deleteUser(@Body() body: deleteUserDTO, @Param('id', ParseIntPipe) id: number, @UserDecorator() user: AuthenticatedUser){
        return this.usersService.deleteUser(body, user, id);
    }

}
