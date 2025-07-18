import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environment/environment';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';
import { UserProfile } from '../../models/UserProfile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LocalizedDatePipe],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  editableProfile: UserProfile = {
    email: '',
    fullName: '',
    birthDate: '',
    gender: ''
  }
  editMode = false;
  message = '';
  error = '';
  loading = false;
  showPassword = false;
  passwordModalOpen = false;
  newPassword = '';
  newPasswordRepeat = '';
  passwordError = '';
  passwordSuccess = '';
  password = '********'; // Gerçek password backend’den gelmez! Sadece maskeli göster.
  profile: UserProfile | null = null;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) { }


  ngOnInit() {
    this.auth.getProfile().subscribe({
      next: (data) => {
        this.profile = data.user;
      },
      error: (err) => {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    });
  }



  toggleEdit() {
    this.editMode = !this.editMode;
    this.message = '';
    this.error = '';
    this.password = '';
  }

  updateProfile() {
    this.error = '';
    this.message = '';
    this.loading = true;

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.editableProfile.email || !emailRegex.test(this.editableProfile.email)) {
      this.error = this.translate.instant('REGISTER_EMAIL_INVALID');
      this.loading = false;
      return;
    }

    // Doğum tarihi boş olmasın
    if (!this.editableProfile.birthDate) {
      this.error = this.translate.instant('REGISTER_BIRTHDATE_REQUIRED');
      this.loading = false;
      return;
    }

    // Cinsiyet boş olmasın
    if (!this.editableProfile.gender) {
      this.error = this.translate.instant('REGISTER_GENDER_REQUIRED');
      this.loading = false;
      return;
    }

    // Profil güncelleme isteği
    this.auth.updateProfile(this.editableProfile).subscribe({
      next: (res) => {
        // Beklenen backend cevabı: { message: string, user: UserProfile }
        this.message = this.translate.instant('PROFILE_UPDATE_SUCCESS');
        this.loading = false;
        this.editMode = false;
        // Ana profili de güncelle
        this.profile = res.user;
      },
      error: (err) => {
        this.error = err.error?.message || this.translate.instant('PROFILE_UPDATE_ERROR');
        this.loading = false;
      }
    });
  }

  get hiddenPassword() {
    return this.showPassword ? this.password : '•'.repeat(8);
  }

  openPasswordModal() {
    this.newPassword = '';
    this.newPasswordRepeat = '';
    this.passwordError = '';
    this.passwordSuccess = '';
    this.passwordModalOpen = true;
  }

  changePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';

    if (this.newPassword !== this.newPasswordRepeat) {
      this.passwordError = 'Şifreler eşleşmiyor';
      return;
    }
    // Şifre validasyonu burada yapılabilir (büyük harf, sayı, sembol...)

    this.auth.changePassword(this.newPassword).subscribe({
      next: () => {
        this.passwordSuccess = 'Şifre başarıyla değiştirildi!';
        setTimeout(() => this.passwordModalOpen = false, 1500);
      },
      error: err => {
        this.passwordError = err.error?.message || 'Şifre değiştirilemedi!';
      }
    });
  }

}
