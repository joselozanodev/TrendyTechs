import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

   async createUser(createUserDto: Prisma.UserCreateInput){
        return await this.databaseService.user.create({
            data: createUserDto
        })
    }

   async getAllUsers(role?: Role){
        if(role){
            return await this.databaseService.user.findMany({
                where: {
                    role,
                }
            })
        }
        return await this.databaseService.user.findMany()
    }

    async getUserById(id: string) {
        const user = await this.databaseService.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`No se pudo encontrar un usuario con el ID: ${id}`);
        }
        return user;
    }

    async updateUser(id: string, updateUserDto: Prisma.UserUpdateInput){

        return await this.databaseService.user.update({
            where: {
                id,
            },
            data: updateUserDto
        })
    }

    async deleteUser(id: string){
        return await this.databaseService.user.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })
    }

    async destroyUser(id: string){
        return await this.databaseService.user.delete({
            where: {
                id,
            }
        })
    }

}
