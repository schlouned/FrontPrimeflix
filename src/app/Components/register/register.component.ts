import { Component, OnInit } from '@angular/core';
import {RegistrationService} from "../../Service/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //members
  form: FormGroup;
  //flag to know if the form was submitted
  submitted = false;
  // convenience getter for easy access to form component in html side
  get f() { return this.form.controls; }

  //constructor
  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      address:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
  });
  }

  //methods
  ngOnInit(): void {
  }

  //check if validators are ok before sending to the back end
  onSubmit(){
    this.submitted = true;

    //stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //registration (send to backend)
    this.registrationService.register(this.form.value).
    subscribe(res => {
        if(res.status == "200" && res.message == "REGISTERED"){
          alert("Registration successful, please check your email for verification instructions");
          this.router.navigate(['../login']);
        }
        if(res.status == "400" && res.message == "CUSTOMER_ALREADY_EXIST"){
          console.log("customer already exist");
          alert('user already registered');
        }
      },
      err =>{
        alert("An error has occured");
      });

  }





}
