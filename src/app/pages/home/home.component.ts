import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../core/services/categories/category.service';
import { ProductService } from '../../core/services/proudcts/product.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  search: string = '';

  custMainpsliader: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  };

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };

  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  product: Iproduct[] = [];
  category: Icategory[] = [];

  ngOnInit(): void {
    this.getproductsdata();
    this.getcategorydata();
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

  getcategorydata(): void {
    this.categoryService.getAllcategry().subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {
      }
    });
  }
}