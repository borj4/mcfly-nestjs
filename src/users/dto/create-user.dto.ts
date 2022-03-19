import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"; // import dependency if you believe in this with npm install class-validator --save
// or $ npm i --save class-validator class-transformer for ValidationPipeOptions, recommended for nest doc

export class createUserDto {

    @IsString()
        @IsNotEmpty()
        readonly fullname: string;
    
        @IsString()
        @IsNotEmpty()
        readonly nickname: string;
    
        @IsEmail()
        @IsNotEmpty()
        readonly email: string;
    
        @IsString()
        @IsNotEmpty()
        password: string;

}