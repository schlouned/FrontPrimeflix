import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  //member
  title = 'TrainingAccountAuth';

  //constructor
  constructor(private router: Router){

  }

  //methods
  ngOnInit() {
    this.router.navigate(["/home"]);
  }
}
