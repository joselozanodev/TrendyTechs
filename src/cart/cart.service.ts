import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartService {
    constructor(private readonly databaseService:DatabaseService) {}

   async getCartByUserId(id: string){
        return this.databaseService.cart.findUnique({
            where: {
                userId: id,
            },
            include: {
                items: true
            }
        })
    }

    async getCartById(id: string){
        return this.databaseService.cart.findUnique({
            where: {
                id,
            },
            include: {
                items: true
            }
        })
    }
    
    async addItemsToCart(cartId: string, createItemDto: Prisma.CartItemCreateInput) {

        const cartItem = await this.databaseService.cartItem.create({
            data: createItemDto,
        });

        const cart = this.databaseService.cart.findUnique({
            where: {
                id: cartId
            },
            include: {
                items: true
            }
        })

        return (await cart).items.find(item => item.id === cartItem.id)
    }

    async deleteItemFromCart(cartId: string, productId: string){
        const cartItem = await this.databaseService.cartItem.findFirst({
            where: {
                cartId,
                productId
            }
        })

        if(cartItem){
             await this.databaseService.cartItem.delete({
                where: {
                    id: cartItem.id
                }
            })
            return cartItem
        }else{
            throw new Error('Cart item not found')

        }   
    }

}
