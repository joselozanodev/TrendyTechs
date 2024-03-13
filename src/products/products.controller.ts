import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductsService) {}


    @Post()
    createProduct(@Body() createProductDto: Prisma.ProductCreateInput){
        return this.productsService.createProduct(createProductDto)
    }

    @Get()
    getAllProducts(@Query('category') category?: any){
        return this.productsService.getAllProducts(category)
    }

    @Get(':id')
    getProductById(@Param('id') id:string){
        return this.productsService.getProductById(id)
    }

    @Patch(':id')
    updateProduct(@Param('id') id:string, @Body() updateProductDto: Prisma.ProductUpdateInput){
        return this.productsService.updateProduct(id, updateProductDto)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id:string){
        return this.productsService.deleteProduct(id)
    }

    @Delete(':id')
    destroyProduct(@Param('id') id:string){
        return this.productsService.destroyProduct(id)
    }

}
