import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandler extends ErrorHandler {

  constructor(private _notificationService: NotificationService) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse) {
    super.handleError(errorResponse);
    let displayMessage = errorResponse?.error?.message || errorResponse.message;
    this._notificationService.error(displayMessage);
  }
}
