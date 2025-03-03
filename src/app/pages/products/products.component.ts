import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/proudcts/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { IWishlist } from '../../shared/interfaces/wishlist';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, FormsModule, SearchPipe, RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  search: any;
  product: Iproduct[] = [];
  wishlistItems: IWishlist[] = [];

  ngOnInit(): void {
    this.getproductsdata();
    this.loadWishlist();
  }

  getproductsdata(): void {
    this.productService.getِAllproudcts().subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (res) => {
      }
    });
  }

  loadWishlist(): void {
    this.wishlistService.getwishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
      },
      error: (err) => {
      }
    });
  }

  isInWishlist(itemId: string): boolean {
    return this.wishlistItems.some(item => item.id === itemId);
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

  addwish(id: string): void {
    this.wishlistService.Addwishlist(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, "Wishlist");
        this.loadWishlist();
      },
      error: (err) => {
      }
    });
  }
}