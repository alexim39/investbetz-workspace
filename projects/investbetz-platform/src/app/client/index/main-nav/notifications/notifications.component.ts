import { Component, OnInit } from '@angular/core';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      // Init dropdown
      $('.dropdown-trigger').dropdown({
        coverTrigger: false
      });
    });
  }

}
