import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

const RETRY_COUNT = 3;
const RETRY_WAIT_MILLISECONDS = 3000;

export const httpRetryInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    retry({
      count: RETRY_COUNT,
      delay: RETRY_WAIT_MILLISECONDS
    }),
    catchError((error) => throwError(() => error)));  
};
