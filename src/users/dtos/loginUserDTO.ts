import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class loginUserDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password:string
}