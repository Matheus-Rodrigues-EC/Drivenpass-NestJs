import { IsString, IsEmail, IsUrl, IsStrongPassword, IsNotEmpty } from "class-validator";

export class createUserDTO{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsUrl()
    avatar: string;
}