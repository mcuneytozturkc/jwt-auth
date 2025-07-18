import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.auth.isLoggedIn();
    // Veya isLoggedIn$ observable kullanıyorsan subscribe edebilirsin
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
