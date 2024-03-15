import { Injectable, NotFoundException } from '@nestjs/common';
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
        try {

            const existingItem = await this.databaseService.cartItem.findFirst({
                where: {
                    cartId: cartId, 
                    productId: createItemDto["productId"]
                }
            })

            if(existingItem || createItemDto.quantity <= 0){
                console.log("Product already exists or quantity isn't a correct value")
                throw new NotFoundException("Product already exists or quantity isn't a correct value")
            }

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
            
        } catch (error) {
            throw new NotFoundException("An error occurred while processing the request. Please check the provided data and try again.")
        }

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
            throw new NotFoundException('Cart item not found')

        }   
    }

    async updateCartItemQuantity(cartId: string, quantityToAdd: number, productId: string){

        
        const existingItem = await this.databaseService.cartItem.findFirst({
            where: {
                cartId,
                productId,
            }
        })
        
        
        try {
            const newQuantity = existingItem.quantity + quantityToAdd['quantity']

            if(newQuantity < 0){
                console.log("Quantity mus be greater than 0")
                throw new Error("Quantity mus be greater than 0")
            }else if(newQuantity === 0){
                return await this.deleteItemFromCart(cartId, productId) 
            }

            await this.databaseService.cartItem.update({
                     where: {
                         id: existingItem.id
                     },
                     data: {
                         quantity: newQuantity
                     }
                 })
                 return existingItem
        } catch (error) {
            throw new NotFoundException('Item not found')
        }
    }

    async emptyCartItems(id: string){

        try {
            await this.databaseService.cartItem.deleteMany({
                where: {
                    cartId: id
                }
            })

            return await this.databaseService.cart.findUnique({
                where: {
                    id,
                },
                include: {
                    items: true
                }
            })
            
        } catch (error) {
            throw new NotFoundException('Cart not found')
        }
    }

    async getCartTotalPrice(id: string) {
        try {
            const cart = await this.databaseService.cart.findUnique({
                where: {
                    id,
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
    
            if (!cart) {
                throw new NotFoundException('Carrito no encontrado');
            }
    
            // Calcula el precio total sumando los precios de los productos multiplicados por sus cantidades
            const totalPrice = cart.items.reduce((acc, item) => {
                return acc + item.product.price * item.quantity;
            }, 0);
    
            return {totalPrice: totalPrice}
        } catch (error) {
            throw new NotFoundException('Carrito no encontrado');
        }
    }
}
