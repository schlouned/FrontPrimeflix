import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {User} from "../Model/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  //constructor
  constructor(private http: HttpClient) {}

  //Registration sign up
  register(user: User): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Request-Headers', 'origin x-requested-with Origin: https://localhost*');

    return this.http.post(environment.baseUrl+environment.signupUrl, JSON.stringify(user),
      {
    headers:{ 'Access-Control-Allow-Origin' : '*' ,'Content-Type': 'application/json' }
      });
  }
}
