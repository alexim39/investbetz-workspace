import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-training',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule],
  template: `

      <div class="about-async">

        <div class="text-content">
          <!-- <h1>
            Diamond Project
          </h1> -->

          <h3>Capacity Building: Mentorship and Training</h3>
            <p>
              Our mentorship and training programs are designed to equip individuals with the necessary skills and knowledge to excel in their personal and professional lives. 
              We offer a wide range of programs tailored to meet the unique needs of our participants, ensuring they receive the support they need to grow and succeed.
            </p>

          <h3>Financial Empowerment: Building Leverage Systems</h3>
            <p>
            Recognizing the importance of financial stability in personal empowerment, the Diamond Project also focuses on building financial leverage systems. 
            We provide individuals with the tools and resources they need to achieve financial independence, thereby enabling them to take control of their financial future.
            </p>


        </div>

        <div class="img-content">
          <img src="assets/img/ttable.jpg" alt="About Async Solutions">
        </div>
      </div>


  `,
  styles: [`


    .about-async {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-grow: 1;
      .img-content {
        width: 50%;
        margin-bottom: -0.5em;
        img {
          width: 100%;
        }
      }

      .text-content {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2em;
        p {
          text-align: justify;
          font-family: system-ui;
        }
      }
    }





/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
  .about-async {
    display: flex;
    flex-direction: row;
    .img-content {
      display: none;
    }
    .text-content {
      width: 100%;
      h1 {
        font-size: 1.5em;
      }
      p {
        padding: 0.5em;
      }

    }
  }
}
  `],
})
export class AboutTrainingComponent {}
