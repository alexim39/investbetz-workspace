import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-bottom',
    templateUrl: './footer-bottom.component.html',
    styleUrls: ['./footer-bottom.component.scss']
})
export class FooterBottomComponent implements OnInit {
  currentYear!: number;
  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

}
