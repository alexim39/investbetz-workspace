import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-story',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule,],
  template: `



      <div class="our-story">

        <div class="img-content">
            <img src="assets/img/story.jpg" alt="About Async Solutions">
        </div>

        <div class="text-content">

            <h3>Impact and Growth: Building Financially Free Community</h3>
            <p>
              The Diamond Project is more than just a business; it’s a movement towards personal growth, financial stability, and community development. 
              We invite you to join us on this transformative journey and together, let’s create a world where everyone has the opportunity to shine like a diamond.
            </p>

            <p>
            As we look to the future, we are excited about the opportunities for growth and expansion. 
            We are dedicated to reaching more individuals, enhancing our programs, and continuing to make a positive impact.
            </p>


            <h3>Diamond Project Online</h3>
            <p>
            This is the online platform of Diamond Project. It replicates the well-established and proven system of Diamond Project in an online format. 
            It serves as an online business platform that is based on the principles of Diamond Project, enabling individuals to leverage the digital world and the internet to enhance themselves and earn money online.            </p>

            <p>
            By leveraging the digital world through Diamond Project Online, people can access opportunities for personal growth and financial success in a convenient online environment.
            </p>

        </div>


      </div>



  `,
  styles: [`

      .our-story {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-grow: 1;
        padding: 4em;

        .img-content {
            width: 50%;
            margin-bottom: -0.5em;
            img {
              width: 100%;
              border-radius: 5%;
            }
        }
      .text-content {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 2em;
        h1 {
          text-align: right;
        }
        p {
          text-align: left;
          font-family: system-ui;
        }
      }
    }


/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
  .our-story {
    display: flex;
    flex-direction: row;
    padding: 1em;


    .img-content {
      display: none;
    }
    .text-content {
      width: 100%;
      text-align: justify;
    }
  }
}
  `],
})
export class AboutStoryComponent {}
