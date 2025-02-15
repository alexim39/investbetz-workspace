import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, NgIf, CurrencyPipe, DatePipe } from '@angular/common';

import { AutoWithdrawInterface } from './auto-wthdraw.interface';
import { AutoWithdrawService } from './auto-withdraw.service';

import { ProfileSettingClass } from './../profile-setting.class';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';


@Component({
    selector: 'app-auto-withdraw',
    templateUrl: './auto-withdraw.component.html',
    styleUrls: ['./auto-withdraw.component.scss'],
    imports: [NgIf, RouterLink, CurrencyPipe, DatePipe]
})
export class AutoWithdrawComponent extends ProfileSettingClass implements OnInit {

  public AutoWithdrawObj!: AutoWithdrawInterface;

  // init empty response
  public isEmptyResponse!: Boolean;

  public dayOfMonth: any;
  public isMonthly!: string;
  public isAutomatic!: string;

  constructor(@Inject(DOCUMENT) private document: Document, private autoWithdrawService: AutoWithdrawService, private auth: AuthService) {
    super()
   }

  private getAutoWithdrawSettings(clientId: string) {
    
    
    this.autoWithdrawService.getAutoWithdrawSettings(clientId).subscribe( (response: any) => {
      
      if (response.message === 'done') {

        // check empty response
        this.emptyResponse(response.data[0]);

        this.AutoWithdrawObj = response.data[0];

        // get the day of the month
        const dayAlone = new Date(this.AutoWithdrawObj.autoWithdrawDate).getDate();
        // add suffix into the day of the month
        const dayWithSuffix = super.getDayNumberSuffix(dayAlone);

        // check occurance state
        if (this.AutoWithdrawObj.isMonthly == true) {
          this.isMonthly = 'Monthly';
          this.dayOfMonth = `Every ${dayAlone}${dayWithSuffix} day of the month`; 
        } else {
          this.isMonthly = 'Once';
          this.dayOfMonth = `On ${dayAlone}${dayWithSuffix} day of the month`; 
        }

        // check automatic state
        if (this.AutoWithdrawObj.isAutomatic == true) {
          this.isAutomatic = 'Yes';
        } else {
          this.isAutomatic = 'No';
        }

      }
      
    }, (error) => {
      console.error(error);
    });

  }


  // check for empty response
  private emptyResponse(array: any) {

    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  public removeAutoWithdraw(withrawId: string){
    this.autoWithdrawService.cancelAutoWithdrawRequest(withrawId).subscribe((response: any) => {

      if (response.message === 'done') {
        
        // reload the document page
        this.document.location.reload();
      }
      
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {

     // Load Current User Details
     this.auth.profile().subscribe((user: any) => {

      const clientId = user._id;
      this.getAutoWithdrawSettings(clientId);
            
    }, (error) => {
      console.error(error);
    })
  }

}
