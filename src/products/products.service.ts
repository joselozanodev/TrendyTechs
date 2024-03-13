import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
    constructor(private readonly databaseService:DatabaseService) {}


    async createProduct(createProductDto: Prisma.ProductCreateInput){
        return await this.databaseService.product.create({
            data: createProductDto
        });
    }

    async getAllProducts(category?: any){
       
        if(category){
            return await this.databaseService.product.findMany({
                where: {
                    category
                }
            })
        }

        return await this.databaseService.product.findMany()

    }

    async getProductById(id: string){
        return await this.databaseService.product.findUnique({
            where: {
                id,
            }
        })
    }

    async updateProduct(id: string, updateProductDto: Prisma.ProductUpdateInput){
        return await this.databaseService.product.update({
            where: {
                id,
            },
            data: updateProductDto
        })
    }

    async deleteProduct(id: string){
        return await this.databaseService.product.update({
            where: {
                id,
            },
            data: {
                isDeleted: true
            }
        })
    }

    async destroyProduct(id: string){
        return await this.databaseService.product.delete({
            where: {
                id,
            }
        })
    }

}
