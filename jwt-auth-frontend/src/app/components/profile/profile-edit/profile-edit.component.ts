import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserProfile } from '../../../models/UserProfile';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent {
  @Input() editableProfile!: UserProfile;
  @Input() loading: boolean = false;
  @Output() save = new EventEmitter<UserProfile>();
  @Output() cancel = new EventEmitter<void>();

  constructor(public translate: TranslateService) { }

  onSave() {
    this.save.emit(this.editableProfile);
  }
  onCancel() {
    this.cancel.emit();
  }
}
