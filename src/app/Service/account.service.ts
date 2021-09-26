import {Inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../Model/user";
import {Observable} from "rxjs";
//import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';


//
@Injectable({ providedIn: 'root' })
export class AccountService {
  //constructor
  constructor( private router: Router, private http: HttpClient) {
  }

  //login method
  login(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'  }
      });
  }

  //logout method
  logout(){
    this.http.get<any>(environment.baseUrl+environment.logoutUrl);
    sessionStorage.clear();
    localStorage.clear();
  }

  //storetoken
  storeToken(token: string, auth_type: string) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_type", auth_type);
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  removeToken() {
    localStorage.removeItem("auth_type");
    localStorage.removeItem("auth_token");
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  //get auth type
  getAuthType(): string | null {
    if (localStorage.getItem("auth_type") !== null) {
      return localStorage.getItem("auth_type");
    }
    return null;
  }

}
