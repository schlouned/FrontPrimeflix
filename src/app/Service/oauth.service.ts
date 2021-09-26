import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenDto} from "../Model/token-dto";

const applicationJson = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  //members
  oauthURL = 'https://localhost:9090/oauth/';

  //constructor
  constructor(private httpClient: HttpClient) { }

  //methods
  public facebook(tokenDto: TokenDto): Observable<any> {
    return this.httpClient.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, applicationJson);
  }

}
