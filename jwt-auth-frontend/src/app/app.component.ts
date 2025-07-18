import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  remainingTime = 0;
  selectedLang = 'tr';
  private sub?: Subscription;

  constructor(public translate: TranslateService, public auth: AuthService, private router: Router) {
    const lang = localStorage.getItem('lang') || 'tr';
    this.selectedLang = lang;
    this.translate.setDefaultLang('tr');
    this.translate.use(lang);
  }

  ngOnInit() {
    this.sub = this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    interval(1000).subscribe(() => {
      if (this.auth.isLoggedIn()) {
        this.remainingTime = Math.floor(this.auth.getRemainingTime() / 1000);
        if (this.remainingTime <= 0) this.logout();
      } else {
        this.remainingTime = 0;
      }
    });
  }

  updateLoginState() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.updateLoginState();
    this.router.navigate(['/login']);
  }

  changeLang(event: Event) {
    // null güvenli cast!
    const target = event.target as HTMLSelectElement | null;
    const lang = target?.value || 'tr';
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
