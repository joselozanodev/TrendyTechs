import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService 
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy{
    
    constructor(){
        super({
            datasources: {
                db: {
                    url: "postgresql://postgres:Peru2017@localhost:5432/mydb?schema=public"
                }
            }
        });
    }


    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

}
