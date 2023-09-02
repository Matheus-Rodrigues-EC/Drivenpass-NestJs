import { IsNotEmpty, IsString } from "class-validator";

export class deleteUserDTO {
    @IsNotEmpty()
    @IsString()
    password: string
}