import { Component, OnInit } from '@angular/core';

import { EventEmitterService } from './../../../../shared/services-module/event-emitter';

import { AutoWithdrawService } from './../auto-withdraw/auto-withdraw.service';
import { LowerCasePipe, TitleCasePipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

// Declare jquery as any
declare const $: any;

@Component({
    selector: 'app-profile-panel',
    templateUrl: './profile-panel.component.html',
    styleUrls: ['./profile-panel.component.scss'],
    imports: [LowerCasePipe, TitleCasePipe, DatePipe]
})
export class ProfilePanelComponent implements OnInit {

  // User image source
  img: string = './../../../assets/img/users/template.png';
  private user: any //UserInterface;

  public lastName!: string;
  public firstName!: string;
  public email!: string;
  public gender!: string;
  public phone!: string;
  public address!: string;
  public city!: string;
  public dob!: string;
  public startDate: any;
  public accountNo!: string;
  public bankName!: string;

  // auto withdraw status
  public status!: string;

  constructor(private auth: AuthService, private eventEmitterService: EventEmitterService, private autoWithdrawService: AutoWithdrawService) { }

  public loadClientProfile(): void {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;

      this.lastName = user.lastName;
      this.firstName = user.firstName;
      this.email = user.email;
      this.startDate = user.startDate;
      this.gender = user.gender;
      this.phone = user.phone;
      this.address = user.address;
      this.city = user.city;
      this.dob = user.dob;
      this.accountNo = user.accountNo;
      this.bankName = user.bankName;

      // call auto withdraw
      this.getAutoWithdrawSettings(this.user._id);
      
    }, (error) => {
      console.error(error);
    })
  }

  // get auto withdraw settings
  private getAutoWithdrawSettings(clientId: string) {
    
    this.autoWithdrawService.getAutoWithdrawSettings(clientId).subscribe( (response: any) => {

      if (response.data[0] === undefined) {
        this.status = 'Off';
      } 
      
      if (response.message === 'done') { 

        // check occurance state
        if (response.data[0].isMonthly === true) {
          this.status = 'On';
        } else if (response.data[0].isMonthly === false) {
          this.status = 'Off';
        }
      }
      
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {

    this.loadClientProfile(); 

     // call refresh method from event emitter service
     if (this.eventEmitterService.subsVar == undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.refreshClientProfilePanel.subscribe(() => {    
        this.loadClientProfile();   
      });    
    }

  }

}
