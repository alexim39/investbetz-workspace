import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { UserDetailsInterface } from './user-details.interface';
import { UserDetailsService } from './user-details.service';
import { EventEmitterService } from './../../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { NgIf, LowerCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

// Declare jquery as any
declare const $: any;

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [FormsModule, ReactiveFormsModule, NgIf, LowerCasePipe, TitleCasePipe, DatePipe]
})
export class UserDetailsComponent implements OnInit {

  private user: any;

  // user profile form group
  userProfileForm: FormGroup;

  public lastName!: string;
  public firstName!: string;
  public phone!: string;
  public signUpEmail!: string;
  public address!: string;
  public city!: string;
  public dob!: Date;
  public gender!: string;

  // loading indicator
  public loading: boolean;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;

  constructor(private auth: AuthService, private userDetailsService: UserDetailsService, private fb: FormBuilder, private eventEmitterService: EventEmitterService, private snackBar: MatSnackBar) { 
    // off loading indicator
    this.loading = false;

    // User Profile formGroup
    this.userProfileForm = this.fb.group({
      'lastName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'firstName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'signUpEmail': [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ])],
      'phone': [null, Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      'address': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'city': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      'dob': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      'gender': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
    });

  }


  public userProfileFormSubmit(post: UserDetailsInterface) {
    // on loading indicator
    this.loading = true;

    // Process sign up
    this.firstName = post.firstName;
    this.lastName = post.lastName;
    this.signUpEmail = post.signUpEmail;
    this.gender = post.gender;
    this.dob = post.dob;
    this.phone = post.phone;
    this.address = post.address;
    this.city = post.city;

    // User Model
    const updatedUserProfileObj: UserDetailsInterface = {
      clientId: this.user._id,
      lastName: this.lastName, 
      firstName: this.firstName,
      signUpEmail: this.signUpEmail,
      gender: this.gender,
      dob: this.dob,
      phone: this.phone,
      address: this.address,
      city: this.city,
    };

    // check if user's age is above 18
    const currentYear = new Date().getFullYear();
    const yearOfBirth = new Date(this.dob).getFullYear();
    const age = currentYear - yearOfBirth;
    if (age < 18) {
      //this.errorMessage = 'The age is still MINOR and will not be allowed for profile update';
      this.snackBar.open(`This age is still MINOR and will not be allowed for profile update1`, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
       // turn of loading
      this.loading = false;
    } else {
      // update on database
      
      
      this.userDetailsService.clientProfileUpdate(updatedUserProfileObj).subscribe( (response: any) => {
        if (response.message === 'done') {
          //this.successMessage = `Your record have been successfully updated`;
          this.snackBar.open(`Your record have been successfully updated`, 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
          });
          // turn off loading indicator
          this.loading = false;

          // refresh balance to update new value
          this.eventEmitterService.refreshClientProfileClick();
          return;
        }
        
      }, (error) => {
        //this.errorMessage = error.error.message;
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
        // turn off loading indicator
        this.loading = false;
      });

    }

  }


  ngOnInit(): void {

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;

      this.lastName = user.lastName;
      this.firstName = user.firstName;
      this.signUpEmail = user.signUpEmail;
      this.gender = user.gender;
      this.dob = user.dob;
      this.phone = user.phone;
      this.address = user.address;
      this.city = user.city;
      
    }, (error: Error) => {
      console.error(error);
    })

    $(document).ready(() => {
      // Init datepicker
      $('.datepicker').datepicker();
    });

  }

}
