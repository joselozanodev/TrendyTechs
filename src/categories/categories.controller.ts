import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    createCategory(@Body() createCategoryDto: Prisma.CategoryCreateInput){
        return this.categoriesService.createCategory(createCategoryDto)
    }

    @Get()
    getAllCategories(){
        return this.categoriesService.getAllCategories()
    }

    @Delete(':id')
    deleteCategory(@Param('id', ParseIntPipe) id: number){
        return this.categoriesService.deleteCategory(id)
    }

    @Delete('/destroy/:id')
    destroyCategory(@Param('id', ParseIntPipe) id: number){
        return this.categoriesService.destroyCategory(id)
    }

}
