import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationService} from "./Service/registration.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import {NavigationComponent} from "./Components/navigation/navigation.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {VerifemailComponent} from "./Components/verifemail/verifemail.component";
import {AccountService} from "./Service/account.service";
import {AngularWebStorageModule} from "angular-web-storage";
import { AuthInterceptor } from './Service/AuthInterceptor';
import {OauthService} from "./Service/oauth.service";
import {TokenService} from "./Service/token.service";
// social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider} from 'angularx-social-login';

// internationalization
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



const appRoutes:Routes=[
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {path:'verifemail',
  component: VerifemailComponent}
  ]

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        NavigationComponent,
        VerifemailComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        AngularWebStorageModule,
        SocialLoginModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
        }
      })
    ],
  providers: [
    RegistrationService,
    AccountService,
    AuthInterceptor,
    OauthService,
    TokenService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'google public key'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('295208228612969'),
          },
        ],
      } as SocialAuthServiceConfig}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// i18n AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
