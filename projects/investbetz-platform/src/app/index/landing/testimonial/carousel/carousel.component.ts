import { Component, OnInit } from '@angular/core';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  // Init Carusel autoplay
  private autoplay = true;

  constructor() { }

  ngOnInit() {
    // Testimonial Carusel jQuery
    $(document).ready(() => {
      $('.carousel').carousel({});
      // Slide after few seconds
      setInterval(() => {
        if (this.autoplay) {
          $('.carousel').carousel('next');
        }
      }, 180000); // every 90s x 2
      // Stop Carusel if hovered over and continue otherwise
      $('.carousel').hover(() => {
        this.autoplay = false;
      }, () => { this.autoplay = true; });
    });
  }

}
