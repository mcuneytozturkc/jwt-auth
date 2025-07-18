import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(value: string | Date): string {
    if (!value) return '';
    let date = value instanceof Date ? value : new Date(value);
    const lang = this.translate.currentLang || 'tr';

    if (lang === 'en') {
      return date.toLocaleDateString('en-GB');
    } else if (lang === 'tr') {
      return date.toLocaleDateString('tr-TR');
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  }
}
