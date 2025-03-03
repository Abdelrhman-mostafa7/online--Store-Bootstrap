import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/categories/category.service';
import { Icategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categaries',
  imports: [],
  templateUrl: './categaries.component.html',
  styleUrl: './categaries.component.scss'
})
export class CategariesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  category: Icategory[] = [];

  ngOnInit(): void {
    this.getcategorydata();
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