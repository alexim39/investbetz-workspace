import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-investmnt',
    templateUrl: './investmnt.component.html',
    styleUrls: ['./investmnt.component.scss'],
    imports: [RouterLink]
})
export class InvestmntComponent implements OnInit {

  constructor() { }

  // Scroll to top of the screen
  public onActivate(event: any) {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
}

  ngOnInit() {}

}
