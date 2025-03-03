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
        if (res && res.data) {
          this.wishdata = res.data;
        }
      },
      error: (err) => {
        if (err.message.includes('401')) {
          Swal.fire({
            title: "Session Expired",
            text: "Please log in to access your wishlist.",
            icon: "warning",
            confirmButtonText: "OK"
          }).then(() => {
            localStorage.removeItem('token'); // مسح التوكن
            window.location.href = "/login"; // إعادة التوجيه إلى صفحة تسجيل الدخول
          });
        } else {
          this.toastrService.error("Failed to load wishlist!", "Error");
        }
      }
    });
  }

  addcart(id: string): void {
    this.cartService.addcart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, "Fresh Cart");
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
      error: () => {
        this.toastrService.error("Failed to add to cart!", "Error");
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
          next: () => {
            this.wishdata = this.wishdata.filter(item => item.id !== id);
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been removed.",
              icon: "success"
            });
          },
          error: () => {
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
