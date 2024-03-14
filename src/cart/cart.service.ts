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
        // Crear el nuevo ítem del carrito
        const cartItem = await this.databaseService.cartItem.create({
            data: createItemDto
        });
    
        // Obtener el carrito existente
        const cart = await this.databaseService.cart.findUnique({
            where: {
                id: cartId
            },
            include: {
                items: true // Incluir los ítems del carrito
            }
        });
    
        // Agregar el nuevo ítem al arreglo de ítems del carrito
        const updatedCart = await this.databaseService.cart.update({
            where: {
               id: cartId
            },
            data: {
                items: {
                    // Añadir el nuevo ítem al arreglo existente de ítems
                    // Se usa el operador spread (...) para incluir los ítems anteriores
                    create: [...cart.items, { // Se añade el nuevo ítem al final del array
                        // Aquí se puede añadir cualquier otro dato necesario para el ítem
                        productId: cartItem.productId,
                        quantity: cartItem.quantity
                    }]
                }
            },
            // Se incluye la opción `include` para devolver los ítems del carrito actualizados
            include: {
                items: true
            }
        });

    
        return updatedCart
    }

}
