import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    name?: string = ""

    @IsEnum(['ADMIN', 'SUPER_ADMIN', 'USER'])
    role?: Role = "USER"
}