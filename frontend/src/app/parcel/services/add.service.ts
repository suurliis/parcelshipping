import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

export interface Parcel {
  sku?: number;
  description?: string;
  address?: string;
  town?: string;
  country?: string;
  deliveryDate?: string;
}

export interface ParcelData {
  items: Parcel[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AddParcelService {
  constructor(private http: HttpClient) {}

  addParcel(parcel: Parcel) {
    return this.http
      .post<any>('/api/parcel', parcel)
      .pipe(map((parcel) => parcel));
  }

  findAllParcels(page: number, size: number): Observable<ParcelData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    return this.http.get<any>('/api/parcel', { params }).pipe(
      map((parcelData: ParcelData) => parcelData),
      catchError((err) => throwError(err))
    );
  }

  paginateByDescription(
    page: number,
    size: number,
    description: string
  ): Observable<ParcelData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('description', String(description));

    return this.http.get<any>('/api/parcel', { params }).pipe(
      map((parcelData: ParcelData) => parcelData),
      catchError((err) => throwError(err))
    );
  }

  paginateByCountry(
    page: number,
    size: number,
    country: string
  ): Observable<ParcelData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('country', String(country));

    return this.http.get<any>('/api/parcel', { params }).pipe(
      map((parcelData: ParcelData) => parcelData),
      catchError((err) => throwError(err))
    );
  }

  findAll(page: number, size: number): Observable<Parcel[]> {
    return this.http.get<Parcel[]>('/api/parcel');
  }

  findOne(id: number): Observable<Parcel> {
    return this.http
      .get('/api/parcel/' + id)
      .pipe(map((parcel: Parcel) => parcel));
  }
}
