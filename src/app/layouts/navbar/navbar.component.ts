import { ChangeDetectorRef, Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/mytranslate/mytranslate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    private readonly cartService = inject(CartService);
    countcart!:number

  
  isligin = input<boolean>(true)
   readonly authService = inject(AuthService)
  private readonly myTranslateService = inject(MyTranslateService)
  private readonly translateService = inject(TranslateService)
  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next: (value) => {
        this.countcart = value;
      }
    },
  );
  
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.cartService.datacart().subscribe({
        next: (res) => {
          if (res) {
            this.cartService.cartNumber.next(res.numOfCartItems);
          }
        },
        error: (err) => {
          console.error("Error fetching cart data:", err);
        }
      });
    } else {
      console.log("User not logged in, skipping cart data fetch.");
    }

  }



  chang(lang: string): void {
    this.myTranslateService.changelangTranslate(lang)
  }
  currentLang(lang:string): boolean {
    return this.translateService.currentLang === lang;
  }

}
