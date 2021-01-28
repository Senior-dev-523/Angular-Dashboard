import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ERRORS } from '../../../utils/static/errors.data';
import { ErrorDialog } from 'src/app/shared/components/error/error.dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private dialog: MatDialog,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authService.logout();
                location.reload(true);
            }
            const resultCode = err.error.result.resultCode;
            this.showErrorMessage(resultCode);
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    showErrorMessage(resultCode: number): void {
        if (!resultCode) {
            return;
        }

        const errorObject = ERRORS.filter((error) => error.code == resultCode);
        if (!errorObject) {
            return;
        }

        this.dialog.open(ErrorDialog, {
            width: '300px',
            height: '99px',
            panelClass: 'dialog-container',
            data: {
                message: errorObject[0].message,
                buttonText: 'Close'
            }
        });
    }
}