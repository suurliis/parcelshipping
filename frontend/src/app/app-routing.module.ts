import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './parcel/component/overview/overview.component';
import { AddComponent } from './parcel/component/add/add.component';

const routes: Routes = [
  {
    path: 'parcel',
    loadChildren: () =>
      import('./parcel/parcel.module').then((m) => m.ParcelModule),
  },
  {
    path: 'view',
    component: OverviewComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
