import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  Isloading: boolean = false;
  mesError: string = '';
  messuccess: string = '';

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  sumbiteform(): void {
    if (this.login.valid) {
      this.Isloading = true;
      this.authService.sendlogin(this.login.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('token', res.token);
                this.authService.getUserData();
                this.router.navigate(['/home']);
              }
            }, 500);

            this.messuccess = res.message;
          }
          this.Isloading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.Isloading = false;
          this.mesError = err.error.message;
        },
      });
    }
  }
}