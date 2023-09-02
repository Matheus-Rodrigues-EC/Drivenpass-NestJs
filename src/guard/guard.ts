import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class Guard implements CanActivate {
constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        const { authorization } = request.headers;
        if (!authorization) {
        throw new UnauthorizedException('Authorization must been provider!');
        }

        try {
        const token = authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedException('Token must been provider!');

        const data = this.usersService.verifyToken(token);
        const user = await this.usersService.readUserId(data.sub);
        response.locals.user = user;

        return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}