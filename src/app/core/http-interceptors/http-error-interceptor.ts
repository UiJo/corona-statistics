import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AppErrorHandler} from "../error-handler/app-error-handler.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _appErrorHandler: AppErrorHandler) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this._appErrorHandler.handleError(err);
          }
        }
      })
    );
  }


}

