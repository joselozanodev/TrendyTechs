import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CategoriesService {
    constructor(private readonly databaseService: DatabaseService) {}


    
}
