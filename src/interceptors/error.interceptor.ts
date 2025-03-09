import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Full Request Details:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys(),
    body: req.body
  });
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `error: ${error.error.message}`;
      } else {
        errorMessage = `error ${error.status}: ${error.message}` ;
       if(error.status == 500) console.log("already exist!!")
      }
      console.error(`error ${errorMessage}`);
      return throwError(()=> error);
    })
  );
};
