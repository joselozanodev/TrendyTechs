import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma } from '@prisma/client';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService) {}

    @Get('/user/:id')
    getCartByUserId(@Param('id') id: string){
        return this.cartService.getCartByUserId(id)
    }

    @Get(':id')
    getCartById(@Param('id') id: string){
        return this.cartService.getCartById(id)
    }

    @Post(':id')
    addItemsToCart(@Param('id') id: string, @Body() createCartItemDto: Prisma.CartItemCreateInput){
        return this.cartService.addItemsToCart(id, createCartItemDto)
    }
    
    @Delete(':id')
    deleteItemFromCart(@Param('id') id: string, @Query('product') product: string){
        return this.cartService.deleteItemFromCart(id, product)
    }

    @Patch(':id')
    updateCartItemQuantity(@Param('id') id: string, @Body() quantity: number, @Query('product') product: string){
        return this.cartService.updateCartItemQuantity(id, quantity, product)
    }


}
