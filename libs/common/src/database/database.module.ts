import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService)=>{
            return {
                uri: configService.get('MONGO_DB_CONNECTION_STRING')
            }
        },
        inject: [ConfigService] // this is necessary to inject service inside useFactory. 
    })],
})
export class DatabaseModule {}
