import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParcelService } from '../service/parcel.service';
import { Observable } from 'rxjs';
import { Parcel } from '../models/parcel.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('parcel')
export class ParcelController {
  constructor(private parcelService: ParcelService) {}

  @Post()
  create(@Body() parcel: Parcel): Observable<Parcel> {
    return this.parcelService.createParcel(parcel);
  }

  @Get(':sku')
  findOne(@Param() params): Observable<Parcel> {
    return this.parcelService.findOne(params.sku);
  }

  @Get()
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('description') description: string,
    @Query('country') country: string,
  ): Observable<Pagination<Parcel>> {
    limit = limit > 20 ? 20 : limit;
    if (description == undefined && country == undefined) {
      return this.parcelService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/api/parcel',
      });
    }

    if (country !== undefined) {
      return this.parcelService.paginateFilterByCountry(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/api/parcel',
        },
        { country },
      );
    } else if (description !== undefined) {
      return this.parcelService.paginateFilterByDescription(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/api/parcel',
        },
        { description },
      );
    }
  }

  @Delete(':sku')
  deleteOne(@Param('sku') sku: string): Observable<any> {
    return this.parcelService.deleteOne(Number(sku));
  }

  @Put(':sku')
  updateOne(
    @Param('sku') sku: string,
    @Body() parcel: Parcel,
  ): Observable<any> {
    return this.parcelService.updateOne(Number(sku), parcel);
  }
}
