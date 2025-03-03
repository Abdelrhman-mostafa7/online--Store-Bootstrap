import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/proudcts/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  Id: any;
  protectedDetails: Iproduct = {} as Iproduct;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.Id = res.get('id');
        this.productService.getِspecificproudcts(this.Id).subscribe({
          next: (res) => {
            this.protectedDetails = res.data;
          },
          error: (err) => {
          }
        });
      },
      error: (err) => {
      }
    });
  }

  addcart(id: string): void {
    this.cartService.addcart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, "fresh Cart");
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
      }
    });
  }
}