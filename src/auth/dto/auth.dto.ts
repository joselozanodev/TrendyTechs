import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(90)
    name: string

    @IsEnum(['ADMIN', 'SUPER_ADMIN', 'USER'])
    @IsNotEmpty()
    role: Role
}