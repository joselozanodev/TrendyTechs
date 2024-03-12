import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('/categories')
    createCategory(){
        return //TODO hacer funcion que cree una categoria
    }

    @Get('/categories')
    getAllCategories(){
        return //TODO hacer funcion que obtenga todas las categorias
    }

    @Delete('/categories/:id')
    deleteCategory(@Param('id') id: number){
        return //TODO hacer funcion que elimine una categoria con borrado logico
    }

    @Delete('/categories/destroy/:id')
    destroyCategory(@Param('id') id: number){
        return //TODO hacer funcion que elimine una categoria de la base de datos
    }

}
