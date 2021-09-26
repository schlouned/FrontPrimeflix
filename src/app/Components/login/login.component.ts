import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../Service/account.service";
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { OauthService } from '../../Service/oauth.service';
import {TokenDto} from "../../Model/token-dto";
import {TokenService} from "../../Service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //members
  //*******
  form: FormGroup;
  //flag to know if the form was submitted
  submitted = false;
  //social
  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;
  // convenience getter for easy access to form component in html side
  get f() { return this.form.controls; }

  //constructor
  //**************
  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService,
              private formBuilder: FormBuilder,
              private authService: SocialAuthService,
              private oauthService: OauthService,
              private tokenService: TokenService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
    this.socialUser= new SocialUser();
    this.userLogged= new SocialUser();
    this.isLogged=false;
  }

  //methods
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //login (send to backend)
    this.accountService.login(this.form.value).subscribe(res => {
        if (res.status == "200" && res.userType == "CLIENT") {
          this.accountService.storeToken(res.authToken, "client");
          this.router.navigate(['/home']);
        } else if (res.status == "200" && res.userType == "ADMIN") {
          this.accountService.storeToken(res.authToken, "admin");
          this.router.navigate(['/home']);
        }
      },
      err => {
        this.router.navigate(['/login']);
      });
  }

  //login with facebook
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.oauthService.facebook(tokenFace).subscribe(
          res => {
            //debug
            if (res.status == "200" && res.userType == "CLIENT") {
              this.accountService.storeToken(res.authToken, "client");
              this.router.navigate(['/home']);
            } else if (res.status == "200" && res.userType == "ADMIN") {
              this.accountService.storeToken(res.authToken, "admin");
              this.router.navigate(['/home']);
            }
            /*console.log("\n######\n" + res.value + "\n######\n");
            this.accountService.storeToken(res.authToken, 'client');
            this.isLogged = true;
            this.router.navigate(['/home']);*/
          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.authService.signOut().then(
      data => {
        this.tokenService.logOut(); //clean the session storage
        this.isLogged = false;
      }
    );
  }

}
