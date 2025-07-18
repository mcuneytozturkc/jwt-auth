import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LocalizedDatePipe } from '../../pipes/localized-date.pipe';
import { UserProfile } from '../../models/UserProfile';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ProfileViewComponent,
    ProfileEditComponent,
    PasswordChangeComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  editableProfile: UserProfile | null = null;
  editMode = false;
  passwordModalOpen = false;
  loading = false;
  message = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.fetchProfile();
  }

  fetchProfile() {
    this.auth.getProfile().subscribe({
      next: (data) => {
        this.profile = data.user;
        this.editableProfile = { ...data.user }; // Edit modda kullanmak için kopyası
      },
      error: () => {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode && this.profile) {
      this.editableProfile = { ...this.profile };
    }
    this.message = '';
    this.error = '';
  }

  onEditSave(updatedProfile: UserProfile) {
    this.loading = true;
    this.auth.updateProfile(updatedProfile).subscribe({
      next: (res) => {
        this.message = this.translate.instant('PROFILE_UPDATE_SUCCESS');
        this.loading = false;
        this.editMode = false;
        // Profil güncellendiğinde ana profile refreshle
        this.profile = res.user;
        this.editableProfile = { ...res.user };
      },
      error: (err) => {
        this.error = err.error?.message || this.translate.instant('PROFILE_UPDATE_ERROR');
        this.loading = false;
      }
    });
  }

  openPasswordModal() {
    this.passwordModalOpen = true;
  }

  onPasswordModalClose() {
    this.passwordModalOpen = false;
  }

  onPasswordChangeSuccess() {
    this.passwordModalOpen = false;
    this.message = this.translate.instant('PASSWORD_CHANGED_SUCCESS');
  }
}
