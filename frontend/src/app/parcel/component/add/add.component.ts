import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import {
  AddParcelService,
  Parcel,
  ParcelData,
} from '../../services/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  // @ts-ignore
  addForm: FormGroup;
  parcels!: Parcel[];

  constructor(
    private addService: AddParcelService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value);
    this.addService
      .addParcel(this.addForm.value)
      .pipe(map((parcel) => this.router.navigate(['view'])))
      .subscribe();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      sku: ['', [Validators.required], [this.skuValidator(this.addService)]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      deliveryDate: ['', Validators.required],
    });
  }

  skuValidator(addService: AddParcelService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.addService.findOne(control.value).pipe(
        map((parcel: Parcel) => {
          return parcel ? { skuNotUnique: true } : null;
        })
      );
    };
  }
}
