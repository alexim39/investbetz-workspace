import { Component, OnInit } from '@angular/core';

import { ProfileSettingService } from './profile-setting.service';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { AutoWithdrawComponent } from './auto-withdraw/auto-withdraw.component';


// Declare jquery as any
declare const $: any;

@Component({
    selector: 'app-profile-setting',
    templateUrl: './profile-setting.component.html',
    styleUrls: ['./profile-setting.component.scss'],
    imports: [
      ProfilePanelComponent, 
      MatAccordion, 
      MatExpansionPanel,
       MatExpansionPanelHeader, 
       MatExpansionPanelTitle, 
       MatExpansionPanelDescription, 
       UserDetailsComponent, 
       BankDetailsComponent, 
       AutoWithdrawComponent
    ]
})
export class ProfileSettingComponent implements OnInit {

  public panelOpenState = false;

  public message!: string;

  uploadFiles!: File;

  constructor ( private upService: ProfileSettingService) {}

  preview (event: any) {
   

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        //this.img = _event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.uploadFiles = event.target.files[0];
    }

    const mimeType = this.uploadFiles.type; // file mime type
    const size = this.uploadFiles.size; // file size

    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported';
      return;
    }
    /*
      private const int TenMegaBytes = 20 * 1024 * 1024;
      if ((fileSize > TenMegaBytes){
        // image is too large
      }
    */
    if ((size / 1048576.0) > 15) { // if size is greater than 15mb
      this.message = 'Image size is too large, please reduce the size';
      // Remove msg after few sec
      setTimeout(() => { this.message = ''; }, 6000);
      return;
    }

    const formData: FormData = new FormData();
    /* formData.append('file', this.uploadFiles);
    formData.append('_id', this.user._id); */

    // Call upload service method
  /*   this.upService.uploadProfileImg( formData ).subscribe((img: any) => {
      console.log(img);
    }, (error: Error) => {
      console.log(error);
    }); */

  }

  ngOnInit() {
    $(document).ready(() => {
      // Init tooltip
      $('.tooltipped').tooltip();

      // Set Label Active For Materialize form: Make lable clear off the form
      $('label').addClass('active');

      // Init select element
      $('select').formSelect();
    });
  }

}
