import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private jwtService: JwtService) {}


    hashData(data: string){
        return bcrypt.hash(data, 10)
    }

    async getTokens(userId: string, email: string, role: Role){
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: 'at-secret',
                expiresIn: 60 * 15
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: 'rt-secret',
                expiresIn: 60 * 60 * 24 * 7
            })            
        ])

        return {
            access_token: at,
            refresh_token: rt,
        }
        
    }

    async signupLocal(dto: AuthDto): Promise<Tokens>{
        const hash = await this.hashData(dto.password)
        const newUser = await this.prisma.user.create({ 
            data: {
                email: dto.email,
                password: hash,
                name: dto.name,
                role: dto.role
            }
        })
    }

    signinLocal(){
        
    }

    logout(){
        
    }

    refreshTokens(){
        
    }

}
