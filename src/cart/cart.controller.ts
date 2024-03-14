import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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

    @Patch(':id')
    addItemsToCart(@Param('id') id: string, @Body() createCartItemDto: Prisma.CartItemCreateInput){
        return this.cartService.addItemsToCart(id, createCartItemDto)
    }


}
