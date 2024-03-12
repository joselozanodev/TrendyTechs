import { Body, Controller, Get, Param, Patch, Post, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Role } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: Prisma.UserCreateInput){
        return this.UsersService.createUser(createUserDto)
    }

    @Get()
    getAllUsers(@Query('role') role?: Role){
        return this.UsersService.getAllUsers(role)
    }

    @Get(':id')
    getUserById(@Param('id') id:string){
        return this.UsersService.getUserById(id)
        
    }

    @Patch(':id')
    updateUser(@Param('id') id:string, @Body() updateUserDto: Prisma.UserUpdateInput){
        return this.UsersService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id') id:string){
        return this.UsersService.deleteUser(id)
    }

    @Delete('/destroy/:id')
    DestroyUser(@Param('id') id:string){
        return this.UsersService.destroyUser(id)
    }

}
