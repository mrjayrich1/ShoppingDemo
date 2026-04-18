import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptor: HttpInterceptorFn = (req, next) => {
    const request = req.clone({
        setHeaders: {
            Authorization: req.url.includes('cart') ? '123Secret456' : ''
        }
    });

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            //Generic error message incase no status code match
            let errorMessage = 'An unknown error occurred';

            if (error.status === 401) {
                errorMessage = 'Invalid token.';
            } else if (error.status === 500) {
                errorMessage = 'Server error.';
            }

            //Logging error to console
            console.error('Global Error Handler:', errorMessage);
            //Alerting user of error
            alert(errorMessage);

            //Finally, throw error
            return throwError(() => new Error(errorMessage));
        })
  );
};
