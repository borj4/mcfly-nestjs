import { IsEmail, IsNotEmpty, IsString } from "class-validator"; // https://docs.nestjs.com/techniques/validation

export class createUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}