import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { AuthComponent } from '../../../auth/auth.component';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss', './banner.component.mobile.scss'],
    imports: [RouterLink, CallToActionComponent, AuthComponent]
})

export class BannerComponent implements OnInit {
  // Init Carusel autoplay
  private autoplay = true;

  constructor() { }

  ngOnInit() {
    $(document).ready( () => {
      // Init Auth Modal
      $('.modal').modal();
      // Init Auth Collapsible
      $('.collapsible').collapsible();

      // Init Carousel
      $('.carousel').carousel();
      // Slide after few seconds
      setInterval(() => {
        if (this.autoplay) {
          $('.carousel').carousel('next');
        }
      }, 6000); // every 60s
      // Stop Carusel if hovered over and continue otherwise
      $('.carousel').hover(() => {
        this.autoplay = false;
      }, () => { this.autoplay = true; });

    });
  }

}
