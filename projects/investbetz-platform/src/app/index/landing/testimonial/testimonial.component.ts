import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'app-testimonial',
    template: `
    <section class="testimonial">
        <div class="row">

          <div class="col m6 s12">
            <h5 class="text-muted">Testimonials</h5>
            <div class="seprator"></div>
            <!-- Carousel Directive -->
            <app-carousel></app-carousel>
          </div>

          <div class="col m6 s12">
            <!--Notice Board-->
            <app-notice-board></app-notice-board>
          </div>

        </div>
    </section>

    `,
    styles: `
    .testimonial {
      padding: 2em;
      h5 {
        margin: 0;
      }
    }
    .seprator {
      height: 2px;
      width: 130px;
      background-color: rgba(255, 158, 128);
      margin-left: 3rem;
    }

    `,
    imports: [CarouselComponent, NoticeBoardComponent]
})

export class TestimonialComponent {}
