import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../Service/account.service";
import {Router} from "@angular/router";
//internationalization
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  //members
  loggedType: string;
  logged: boolean;

  //constructor
  constructor(private accountService: AccountService, private route: Router,
              public translate: TranslateService) {
    //init variable
    this.logged = false;
    this.loggedType = "";

    //set auth type
    if (this.accountService.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.accountService.getAuthType() == "client") {
        this.loggedType = "client";
        this.logged = true;
      } else if (this.accountService.getAuthType() == "admin") {
        this.loggedType = "admin";
        this.logged = true;
      }
    }
    //i18n internationalization
    //declare the different languages
    translate.addLangs(['en', 'fr']);
    //set default language
    translate.setDefaultLang('en');
  }

  //methods
  ngOnInit(): void {
    console.log("********************************************************");
    console.log("login properties: ")
    console.log("-------------------------------------");
    console.log("authetication type: " + this.accountService.getAuthType());
    console.log("token: "+ this.accountService.getToken());
    console.log("********************************************************");
  }

  logout() {
    this.loggedType = "home";
    this.accountService.removeToken();
    this.accountService.logout();
    this.route.navigate(['/login']);
    this.logged=false;
  }

  //i18n internationalization
  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
