import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestJsConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [NestJsConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGO_DB_CONNECTION_STRING: Joi.string().required()
        })
    })],
    providers:[ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
