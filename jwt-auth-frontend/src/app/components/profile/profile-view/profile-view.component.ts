import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from '../../../pipes/localized-date.pipe';
import { UserProfile } from '../../../models/UserProfile';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [TranslateModule, LocalizedDatePipe, UpperCasePipe, CommonModule],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent {
  @Input() profile!: UserProfile;
  @Output() edit = new EventEmitter<void>();
  @Output() changePassword = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }
  onChangePassword() {
    this.changePassword.emit();
  }
}
