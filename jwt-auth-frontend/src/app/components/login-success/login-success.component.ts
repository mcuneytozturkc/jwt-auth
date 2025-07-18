import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  standalone: true,
  imports: [TranslateModule, CommonModule]
})
export class LoginSuccessComponent implements OnInit, OnDestroy {
  countdown = 3;
  timer: any;

  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.timer);
        this.router.navigate(['/profile']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  goProfile() {
    if (this.timer) clearInterval(this.timer);
    this.router.navigate(['/profile']);
  }
}
