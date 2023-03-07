import { Module } from '@nestjs/common';
import { ParcelService } from './service/parcel.service';
import { ParcelController } from './controller/parcel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelEntity } from './models/parcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParcelEntity])],
  providers: [ParcelService],
  controllers: [ParcelController],
})
export class ParcelModule {}
