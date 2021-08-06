import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSnackBarConfig} from "@angular/material/snack-bar/snack-bar-config";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private static readonly DEFAULT_DURATION = 6000;

  constructor(private _snackBar: MatSnackBar,
              private readonly _zone: NgZone) {
  }

  error(message: string): void {
    this.show(message, {
      duration: NotificationService.DEFAULT_DURATION
    });
  }

  private show(message: string, config: MatSnackBarConfig) {
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this._zone.run(() => this._snackBar.open(message, undefined, config));
  }
}
