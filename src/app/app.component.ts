import {Component, HostBinding} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') className = '';

  private _isDarkTheme = false;
  private _title = "Corona Statistics";

  get title(): string {
    return this._title;
  }

  constructor(private _overlay: OverlayContainer) {
  }

  redirectToGitHub() {
    window.open('https://github.com/UiJo/corona-statistics', '_blank');
  }

  toggleTheme() {
    this._isDarkTheme = !this._isDarkTheme;
    const darkClassName = 'darkMode';
    this.className = this._isDarkTheme ? darkClassName : '';
    if (this._isDarkTheme) {
      this._overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this._overlay.getContainerElement().classList.remove(darkClassName);
    }
  }
}
