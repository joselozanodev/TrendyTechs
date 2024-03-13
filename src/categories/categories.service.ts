import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private readonly databaseService: DatabaseService) {}


    async createCategory(createCategoryDto: Prisma.CategoryCreateInput){
        return await this.databaseService.category.create({
            data: createCategoryDto
        })
    }

    async getAllCategories(){
        return await this.databaseService.category.findMany()
    }

    async deleteCategory(id: number){
        return await this.databaseService.category.update({
            where: {
                id,
            },
            data: {
                isDeleted: true
            }
        })
    }

    async destroyCategory(id: number){
        return await this.databaseService.category.delete({
            where: {
                id,
            }
        })
    }
}
