import { IsNotEmpty, IsNumberString, IsString, Length, Matches } from 'class-validator';

export class CreateCardDTO {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumberString()
    @Length(16, 16, {message: 'Card number must have 16 digits!'})
    number: string

    @IsNotEmpty()
    @IsString()
    owner: string

    @IsNotEmpty()
    @IsNumberString()
    @Length(3, 3, {message: 'Card cvv number must have 3 digits!'})
    cvv: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {message: 'Validate date must have format "MM/YYYY"!'})
    expiration: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsNumberString()
    type: number[]
}