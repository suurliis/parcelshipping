import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  navigationEntries = [
    {
      name: 'Add parcel',
      link: 'add',
    },
    {
      name: 'View parcels',
      link: 'view',
    },
  ];

  constructor(private router: Router) {}

  navigateTo(value: any) {
    this.router.navigate(['../', value]);
  }
}
