import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../shared/interfaces/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);
  branddata: IBrand[] = [];

  ngOnInit(): void {
    this.getbrand();

  }
  getbrand(): void {
    this.brandService.getAllbrands().subscribe({
      next: (res) => {
        this.branddata = res.data;
      },
      error: (err) => {
      }
    });
  }


}