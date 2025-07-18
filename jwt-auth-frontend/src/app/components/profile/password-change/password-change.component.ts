// password-change.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './password-change.component.html'
})
export class PasswordChangeComponent {
  @Input() email: string = '';
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() passwordChanged = new EventEmitter<void>();

  newPassword: string = '';
  newPasswordRepeat: string = '';
  passwordSuccess = '';
  passwordError = '';

  loading: boolean = false;

  constructor(
    private auth: AuthService,
    public translate: TranslateService
  ) { }

  changePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';

    // Karmaşık şifre regex'i (en az 1 küçük, 1 büyük, 1 rakam, 1 sembol ve min. 8 karakter)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!passwordRegex.test(this.newPassword)) {
      this.passwordError = this.translate.instant('REGISTER_PASSWORD_COMPLEXITY');
      return;
    }
    if (this.newPassword !== this.newPasswordRepeat) {
      this.passwordError = this.translate.instant('NEW_PASSWORD_MISMATCH');
      return;
    }

    this.loading = true;
    this.auth.changePassword(this.newPassword).subscribe({
      next: () => {
        this.passwordSuccess = this.translate.instant('PASSWORD_CHANGED_SUCCESS');
        setTimeout(() => {
          this.loading = false;
          this.closeModal();
          this.passwordChanged.emit();
        }, 1500);
      },
      error: err => {
        this.loading = false;
        this.passwordError = err.error?.message || this.translate.instant('PASSWORD_CHANGED_ERROR');
      }
    });
  }


  closeModal() {
    this.newPassword = '';
    this.newPasswordRepeat = '';
    this.passwordError = '';
    this.passwordSuccess = '';
    this.close.emit();
  }
}
