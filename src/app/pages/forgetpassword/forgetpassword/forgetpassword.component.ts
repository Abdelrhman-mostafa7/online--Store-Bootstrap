import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  step: number = 1;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  verifyEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  verifyEmailSubmit(): void {
    this.authService.setEmailVerify(this.verifyEmailForm.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
      },
      error: (err) => {
      }
    });
  }

  verifyCodeSubmit(): void {
    this.authService.setCodeVerify(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
      },
      error: (err) => {
      }
    });
  }

  resetPasswordSubmit(): void {
    this.authService.setrestpassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          this.authService.getUserData();
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
      }
    });
  }
}