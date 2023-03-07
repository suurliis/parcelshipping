import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { AddParcelService, ParcelData } from '../../services/add.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  // @ts-ignore
  dataSource: ParcelData = null;
  // @ts-ignore
  pageEvent: PageEvent = null;
  // @ts-ignore
  descriptionFilter: string = null;
  // @ts-ignore
  countryFilter: string = null;
  // @ts-ignore
  countries = ['Estonia', 'Latvia', 'Lithuania'];

  columnsToDisplay: string[] = [
    'sku',
    'description',
    'address',
    'town',
    'country',
    'deliveryDate',
  ];

  constructor(private addService: AddParcelService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.addService
      .findAllParcels(1, 10)
      .pipe(
        tap((parcels) => console.log(parcels)),
        map((parcelData: ParcelData) => (this.dataSource = parcelData))
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.descriptionFilter !== null) {
      this.findByDescription(this.descriptionFilter);
    } else {
      page = page + 1;
      this.addService
        .findAllParcels(page, size)
        .pipe(map((parcelData: ParcelData) => (this.dataSource = parcelData)))
        .subscribe();
    }
  }

  findCountryFromDropDown(country: any) {
    this.addService
      .paginateByCountry(0, 10, country.value)
      .pipe(map((parcelData: ParcelData) => (this.dataSource = parcelData)))
      .subscribe();
  }

  findByDescription(description: string) {
    this.addService
      .paginateByDescription(0, 10, description)
      .pipe(map((parcelData: ParcelData) => (this.dataSource = parcelData)))
      .subscribe();
  }
}
