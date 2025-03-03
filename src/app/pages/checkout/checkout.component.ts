import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../core/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly checkoutService = inject(CheckoutService);
  private readonly activatedRoute = inject(ActivatedRoute);
  cartid: string = '';
  checkout: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.cartid = parm.get('id')!;
    });
  }

  sumbiteform(): void {
    this.checkoutService.checkout(this.cartid, this.checkout.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          open(res.session.url, '_self');
        }
      },
      error: (err) => {
      }
    });
  }
}