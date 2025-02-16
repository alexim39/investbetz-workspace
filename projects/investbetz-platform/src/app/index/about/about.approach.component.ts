import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Async training approach page */
@Component({
  selector: 'async-about-approach',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
  template: `

      <div class="training-approach">

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="water_drop"></mat-icon>
            <h1>Capacity Building<!-- : Mentorship and Training --></h1>
          </div>
          <div class="content">
              <p>
              Our mentorship and training programs are the cornerstone of the Diamond Project. 
              We understand that capacity building is not a one-size-fits-all process. 
              Therefore, we tailor our programs to meet the unique needs of our participants.             
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="lightbulb"></mat-icon>
            <h1>Financial Empowerment<!-- : Building Leverage Systems --></h1>
          </div>
          <div class="content">
              <p>
              Financial stability is a key aspect of personal empowerment. 
              Without it, individuals may find it challenging to pursue their goals and dreams. 
              Recognizing this, the Diamond Project is committed to building financial leverage systems.             
            </p>
            </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="approval_delegation"></mat-icon>
            <h1>Community Impact</h1>
          </div>
          <div class="content">
            <p>
            The Diamond Project is not just about individual empowerment; it’s about community development. 
            By helping individuals realize their potential, we are contributing to the growth and prosperity of our communities. 
            Every individual we empower becomes a beacon of change, inspiring others to strive for their own personal growth.
            </p>
          </div>
        </div>

        <!-- <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="supervised_user_circle"></mat-icon>
            <h1>Continuous Improvement</h1>
          </div>

          <div class="content">
            <p>
            We believe in the power of continuous improvement. We regularly gather feedback from our customers and use it to refine our services. 
            By constantly striving to do better, we ensure that our services not only meet but exceed our customers’ expectations.            </p>
          </div>
        </div> -->

      </div>

  `,
  styles: [`
    .training-approach {
      background-color: #050111;
      //background-color: #00838F;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      padding: 3em;
      align-items: center;

      .approach-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          color: white;
          h1 {
            font-size: 1.5em;
            margin-top: -0.2em;
            font-family: system-ui;
          }
          mat-icon {
            //border-radius: 50%;
            color: white;
            //border: 1px solid white;
            transform: scale(2);
            margin-right: 1em;
          }
        }

        .content {
          color: white;
          font-size: 0.9em;
          padding-left: 3em;
          p {
            line-height: 2em;
            text-align: justify;
          }
        }
      }
    }


/* Extra small devices (phones, 1500px and down) */
@media only screen and (max-width: 1500px) {
  .training-approach {
      display: flex;
      flex-direction: column;
      .approach-card {
        margin-top: 2em;
      }
  }
}
  `],
})
export class AboutApproachComponent { }
