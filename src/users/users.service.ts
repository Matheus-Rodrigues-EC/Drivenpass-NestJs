import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createUserDTO } from './dtos/createUserDTO';
import { loginUserDTO } from './dtos/loginUserDTO';
import { deleteUserDTO } from './dtos/deleteUserDTO';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUser } from '../protocols/authenticated';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository,
                private readonly jwtService: JwtService
                ) {}

    async createUser(data: createUserDTO){
        const userExists = await this.usersRepository.readUserEmail(data.email);
        if(userExists) throw new HttpException('User Already Exists', HttpStatus.CONFLICT);

        return await this.usersRepository.createUser(data);
    }

    async loginUser(data: loginUserDTO){
        const user = await this.usersRepository.readUserEmail(data.email);
        if(!user) throw new HttpException('Email and/or password incorrect', HttpStatus.UNAUTHORIZED);

        const validatePassword = bcrypt.compareSync(data.password, user.password);
        if(!validatePassword) throw new HttpException('Email and/or password incorrect', HttpStatus.UNAUTHORIZED);

        return this.generateToken(user);
    }

    async readUserId(id: number){
        const userExists = await this.usersRepository.readUserId(id);
        if(!userExists) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        return userExists;
    }

    async deleteUser(data: deleteUserDTO, loggedUser: AuthenticatedUser, userId: number){
        const UserId = await this.usersRepository.readUserId(userId)
        if(UserId.id !== loggedUser.id) throw new HttpException('You do not have permission to delete this user', HttpStatus.UNAUTHORIZED)

        const userExists = await this.usersRepository.readUserEmail(loggedUser.email);
        if(!userExists) throw new HttpException('Email and/or password incorrect', HttpStatus.UNAUTHORIZED);

        const validatePassword = bcrypt.hashSync(data.password, userExists.password);
        if(!validatePassword) throw new HttpException('Email and/or password incorrect', HttpStatus.UNAUTHORIZED);

        return await this.usersRepository.deleteUserData(userId);
    }

    private generateToken(user: User) {
        const { id, email, username } = user;
        return {
            token: this.jwtService.sign(
                {
                    email,
                    username,
                },
                { subject: String(id) },
            )};
    }

    verifyToken(token: string) {
        const tokenData = this.jwtService.verify(token);
        return { ...tokenData, sub: parseInt(tokenData.sub) } as {
            email: string;
            name: string;
            sub: number;
        };
    }

}
