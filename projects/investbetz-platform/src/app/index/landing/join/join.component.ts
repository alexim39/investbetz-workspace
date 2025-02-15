import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/** @title Async why you should join page */
@Component({
  selector: 'async-join',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule],
  template: `
    <div class="training-approach">
      <h1>Why You Should Join?</h1>

      <section class="approach-cards">
        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="rocket_launch"></mat-icon>
            <h1>Financial Success</h1>
          </div>
          <div class="content">
            <p>
              Our system enables you to earn money while you sleep. This occurs after successfully completing our self-development and mentorship training and implementing our business methodology.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="lightbulb"></mat-icon>
            <h1>Reduced Stress</h1>
          </div>
          <div class="content">
            <p>
              By combining our system, which operates on the principle of leverage, with the Diamond Project (Online) partners platform, you can manage and run your business with 90% less effort.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="approval_delegation"></mat-icon>
            <h1>Proven System</h1>
          </div>
          <div class="content">
            <p>
              Our system has a track record of success, providing a reliable path to financial success and personal growth.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="supervised_user_circle"></mat-icon>
            <h1>Continuous Support</h1>
          </div>
          <div class="content">
            <p>
              The mentorship and training we offer provide ongoing support for your business, ensuring that you remain on course and achieve both your financial and personal growth objectives.
            </p>
          </div>
        </div>
      </section>

      <section class="call-to-action">
        <p>
          Use the button below to join our WhatsApp group, where we provide links to weekly online meetings to showcase our business.
        </p>

        <div class="down-arrow">
          <mat-icon>arrow_downward</mat-icon>
        </div>

        <button mat-raised-button (click)="lunchWhatsAppGroup()">
          <span class="fa fa-whatsapp"></span> WhatsApp Group
        </button>
      </section>
    </div>
  `,
  styleUrls: ['join.component.scss']
})
export class JoinComponent {

  @Input() partnerWhatsappGroupLink!: string | undefined;

  lunchWhatsAppGroup() {
    if (this.partnerWhatsappGroupLink) {
      window.open(this.partnerWhatsappGroupLink, '_blank');
    } else {
      window.open('https://chat.whatsapp.com/EO6Xl6zsDwwA9yZrcVUwP2', '_blank');
    }
    
  }
}