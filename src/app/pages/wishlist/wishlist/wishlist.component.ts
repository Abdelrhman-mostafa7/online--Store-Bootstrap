import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { IWishlist } from '../../../shared/interfaces/wishlist';
import { WishlistService } from './../../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  wishdata: IWishlist[] = [];

  ngOnInit(): void {
    this.getwish();
  }

  getwish(): void {
    this.wishlistService.getwishlist().subscribe({
      next: (res) => {
        this.wishdata = res.data;
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

  removeitemwish(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishlistService.deletwishlist(id).subscribe({
          next: (res) => {
            this.wishdata = this.wishdata.filter(item => item.id !== id);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success"
            });
          },
          error: (err) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove the item.",
              icon: "error"
            });
          }
        });
      }
    });
  }
}