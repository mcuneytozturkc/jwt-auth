import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  password = '';
  email = '';
  error = '';
  success = '';
  fullName = '';
  birthDate = '';
  passwordConfirm = '';
  passwordError = '';
  gender = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) { }

  onRegister() {
    this.error = '';
    this.success = '';

    if (!this.email) {
      this.error = this.translate.instant('REGISTER_EMAIL_REQUIRED');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = this.translate.instant('REGISTER_EMAIL_INVALID');
      return;
    }

    if (!this.password) {
      this.error = this.translate.instant('REGISTER_REQUIRED');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(this.password)) {
      this.error = this.translate.instant('REGISTER_PASSWORD_COMPLEXITY');
      return;
    }

    this.loading = true;

    this.auth.register(this.password, this.email, this.fullName, this.birthDate, this.gender)
      .subscribe({
        next: () => {
          this.auth.login(this.email, this.password).subscribe({
            next: () => {
              this.loading = false;
              this.router.navigate(['/profile']);
            },
            error: (err: any) => {
              this.error = err.error?.message || this.translate.instant('REGISTER_ERROR');
              this.loading = false;
            }
          });
        },
        error: (err: any) => {
          this.error = err.error?.message || this.translate.instant('REGISTER_ERROR');
          this.loading = false;
        }
      });
  }

  onPasswordMatch() {
    if (this.password !== this.passwordConfirm) {
      this.passwordError = 'Şifreler eşleşmiyor';
      return;
    }
  }

}
