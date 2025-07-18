import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) { }

  onLogin() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login-success']);
      },
      error: (err: any) => {
        this.error = err.error?.message || this.translate.instant('LOGIN_ERROR');
      }
    });
  }

}
