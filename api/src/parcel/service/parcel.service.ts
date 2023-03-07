import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParcelEntity } from '../models/parcel.entity';
import { Parcel } from '../models/parcel.interface';
import { Like, Repository } from 'typeorm';
import { Observable, from, map } from 'rxjs';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(ParcelEntity)
    private readonly parcelRepository: Repository<ParcelEntity>,
  ) {}

  createParcel(parcel: Parcel): Observable<Parcel> {
    return from(this.parcelRepository.save(parcel));
  }

  findOne(sku: number): Observable<Parcel> {
    return from(this.parcelRepository.findOneBy({ sku }));
  }

  paginate(options: IPaginationOptions): Observable<Pagination<Parcel>> {
    return from(paginate<Parcel>(this.parcelRepository, options)).pipe(
      map((parcelsPageable: Pagination<Parcel>) => {
        return parcelsPageable;
      }),
    );
  }

  paginateFilterByDescription(
    options: IPaginationOptions,
    parcel: Parcel,
  ): Observable<Pagination<Parcel>> {
    return from(
      this.parcelRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { deliveryDate: 'ASC' },
        select: [
          'sku',
          'description',
          'address',
          'country',
          'town',
          'deliveryDate',
        ],
        where: [{ description: Like(`%${parcel.description}%`) }],
      }),
    ).pipe(
      map(([parcels, totalParcels]) => {
        const parcel: Pagination<Parcel> = {
          items: parcels,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalParcels / Number(options.page),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: parcels.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalParcels,
            totalPages: Math.ceil(totalParcels / Number(options.limit)),
          },
        };
        return parcel;
      }),
    );
  }

  paginateFilterByCountry(
    options: IPaginationOptions,
    parcel: Parcel,
  ): Observable<Pagination<Parcel>> {
    return from(
      this.parcelRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { deliveryDate: 'ASC' },
        select: [
          'sku',
          'description',
          'address',
          'country',
          'town',
          'deliveryDate',
        ],
        where: [{ country: Like(`%${parcel.country}%`) }],
      }),
    ).pipe(
      map(([parcels, totalParcels]) => {
        const parcel: Pagination<Parcel> = {
          items: parcels,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalParcels / Number(options.page),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: parcels.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalParcels,
            totalPages: Math.ceil(totalParcels / Number(options.limit)),
          },
        };
        return parcel;
      }),
    );
  }

  deleteOne(sku: number): Observable<any> {
    return from(this.parcelRepository.delete(sku));
  }

  updateOne(sku: number, parcel: Parcel): Observable<any> {
    return from(this.parcelRepository.update(sku, parcel));
  }
}
