import { Component, OnInit } from '@angular/core';
// Declare jquery as any
declare const $: any;
import { Router } from '@angular/router';
import {CobybetService} from './copybet.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgFor, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-copybet',
    templateUrl: './copybet.component.html',
    styleUrls: ['./copybet.component.scss'],
    imports: [NgFor]
})
export class CopybetComponent implements OnInit {

  private clientId!: string;

  public cobybettorsObj = [];

  // User image source
  img: string = 'img/users/template.png';

  constructor(private auth: AuthService, private router: Router, private cbService: CobybetService, private snackBar: MatSnackBar) { }

  private copybettors() {

    this.cbService.getCopybettors().subscribe((response: any) => {
      if (response.message === 'done') {
       /*  this.snackBar.open('Your deposit transaction was successful', 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'success']
         }); */

         // get all bettor clients
        for (let i = 0; i < response.data.length; i++) {  
          if (response.data[i].bettor === true) {
            //this.cobybettorsObj.push(response.data[i]);
          }
        }
        this.cobybettorsObj;

      }
    }, (error) => {
      console.error(error);
      /* this.snackBar.open(error.error.error, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       }); */
    })
  }


  ngOnInit(): void {
    // get copy bettors
    this.copybettors();

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      //this.cardDepositEmail = user.email;
      this.clientId = user._id;

    }, (error: Error) => {
      // disable btn
      console.error(error)
    });
  }

}
