import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AccountService} from "./account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //constructor
  constructor(private accountService: AccountService) { }

  //methods
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if(this.accountService.getToken()!=null){
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.accountService.getToken()}`)
          });

          return next.handle(authReq);
      } else{
        return next.handle(req);
      }

  }
}
