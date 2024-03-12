import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: Prisma.UserCreateInput){
        return 'create user function'
    }

    @Get()
    getAllUsers(@Query('role') role: ){

    }

}
