import { IsEmail, IsNotEmpty, IsString, IsArray } from "class-validator"; // https://docs.nestjs.com/techniques/validation

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsArray()
    readonly inbox: [];

    @IsArray()
    readonly outbox: [];

}