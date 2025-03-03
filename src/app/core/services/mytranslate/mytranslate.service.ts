import { TranslateService } from '@ngx-translate/core';
import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null);
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private id: Object
  ) {
    if (isPlatformBrowser(this.id)) {
      // 1- Set Default Lang
      this.translateService.setDefaultLang('en');

      // 2- Get Lang Local -- Saved
      const savedLang = localStorage.getItem('lang'); // en, ar

      // 3- Use Lang Local
      if (savedLang) {
        this.translateService.use(savedLang);
      }

      // 4- Change Direction
      this.changeDirection();
    }
  }
  changeDirection(): void {
    const lang = localStorage.getItem('lang');

    if (lang === 'en') { // dir ltr
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (lang === 'ar') { // dir rtl
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changelangTranslate(lang: string): void {
    //1-save local
    localStorage.setItem('lang', lang)
    //2- use lang
    this.translateService.use(lang)
    //3- Change direction
    this.changeDirection()
  }
}