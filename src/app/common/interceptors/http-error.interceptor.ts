import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { EventMediatorService } from '../services/event-mediator.service';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const eventMediator = inject(EventMediatorService);
    
  return next(req).pipe(catchError((error) => {  
    eventMediator.notifyOnNotificationsChanged(JSON.stringify(error));
    return throwError(() => error);
  }));
};
