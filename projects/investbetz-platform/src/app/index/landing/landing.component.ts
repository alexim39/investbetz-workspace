import { Component, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FooterComponent } from './footer/footer.component';
import { FooterBottomComponent } from './footer/footer-bottom/footer-bottom.component';
import { JoinComponent } from './join/join.component';
import { FloatingBtnComponent } from './floating-btn/floating-btn.component';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'async-index',
    template: `
    <app-banner></app-banner>
    <async-floating-btn></async-floating-btn>
    <app-testimonial></app-testimonial>
    <async-join></async-join>
    <app-footer></app-footer>
    <app-footer-bottom></app-footer-bottom>
    `,
    imports: [BannerComponent, TestimonialComponent, JoinComponent, FooterComponent, FloatingBtnComponent, FooterBottomComponent]
})
export class LandingComponent implements OnInit {
  ngOnInit() {
    // Init fixed-action-btn for social media
    $(document).ready(() => {
      $('.fixed-action-btn').floatingActionButton();
    });
  }

}
