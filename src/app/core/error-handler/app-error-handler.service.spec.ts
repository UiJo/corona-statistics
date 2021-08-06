import {TestBed} from '@angular/core/testing';

import {AppErrorHandler} from './app-error-handler.service';
import {NotificationService} from "../notifications/notification.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

describe('AppErrorHandlerService', () => {
  let service: AppErrorHandler;
  let notificationServiceSpy: NotificationServiceSpy;

  class NotificationServiceSpy {
    error = jasmine.createSpy('error(message: string)').and.callFake(() => {
      }
    )
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler,
        {provide: NotificationService, useClass: NotificationServiceSpy}
      ]

    });
    service = TestBed.inject(AppErrorHandler);
    notificationServiceSpy = TestBed.inject(NotificationService) as any;
  });


  it('should call notification service on error', () => {
    const error = {
      title: 'ERROR',
      detail: 'Error detail',
      status: 419
    };

    const headers = new HttpHeaders();
    const httpErrorResponse
      = new HttpErrorResponse({error, headers, status: 419, statusText: ''});
    service.handleError(httpErrorResponse);

    expect(notificationServiceSpy.error).toHaveBeenCalled();
  })
});
