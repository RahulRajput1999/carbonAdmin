import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { NetworkServiceService } from '../network-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private networkService: NetworkServiceService,
    private builder: FormBuilder,
    private router: Router
  ) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.form = this.builder.group({
      productNameFormControl: new FormControl('', [
        Validators.required,
      ]),
      productBrandFormControl: new FormControl('', [
        Validators.required,
      ]),
      productPriceFormControl: new FormControl('', [
        Validators.required,
      ]),
      productDescFormControl: new FormControl('', [
        Validators.required
      ]),
      productBarcodeFormControl: new FormControl('', [
        Validators.required
      ]),
      productQuantityFromControl: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit() {
    // console.log(this.f.productBrandFormControl.value);
    this.networkService.postProduct({
      name: this.f.productNameFormControl.value,
      brand: this.f.productBrandFormControl.value,
      price: this.f.productPriceFormControl.value,
      barcode: this.f.productBarcodeFormControl.value,
      description: this.f.productDescFormControl.value,
      quantity: this.f.productQuantityFromControl.value,
    }).subscribe(data => {
      console.log(data);
      if (data['status']) {
        console.log(data['data']);
      } else {
        console.log('Some thing went wrong');
      }
    });
  }

}
