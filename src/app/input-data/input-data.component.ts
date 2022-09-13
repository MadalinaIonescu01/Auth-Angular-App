import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('f') signupForm: NgForm; // de ce a folosit viewchild? 
    user = {
    firstName: '',
    lastName: '', 
    city: '',
    email: '',
    phoneNumber: ''
    };

   

    submitted = false;
  onSubmit() {

    this.submitted = true;
    this.user.firstName = this.signupForm.value.personalData.firstName;
    this.user.lastName = this.signupForm.value.personalData.lastName;
    this.user.city = this.signupForm.value.personalData.city;
    this.user.email = this.signupForm.value.personalData.email;
    this.user.phoneNumber = this.signupForm.value.personalData.phoneNumber;

  

    this.signupForm.reset();



  }
  
}
