import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { GetCurrentUserId, Public } from 'src/common/decorators';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: AuthDto): Promise<Tokens>{
        return this.authService.signupLocal(dto)
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<Tokens>{
        return this.authService.signinLocal(dto)
    }


    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string){
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string ){
        return this.authService.refreshTokens(userId, refreshToken)
    }
}
