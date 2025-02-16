import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-async',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule],
  template: `
      <div class="about-training">
        <div class="text-content">
          <h1>
          The Diamond Project: Unleashing Potential, Building Capacity
          </h1>

          <p>
            The Diamond Project is an innovative initiative that seeks to unearth the inherent potential within individuals, much like a diamond waiting to be discovered. 
            We believe that every person has a unique brilliance within them, and given the right conditions, they can shine with unparalleled radiance.         
          </p>

          <p>
          We are dedicated to building financial leverage systems that provide individuals with the means to achieve financial independence.
          </p>
        </div>
      </div>

  `,
  styles: [`
    .about-training {
      padding: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #eee;
      .text-content {
        text-align: center;
        h1 {
          //color: #00838F;
          color: #050111;
          font-size: 3em;
        }

        p {
          text-align: justify;
          font-family: system-ui;
          width: 70em;
        }
      }
    }


/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
.about-training {
    padding: 1em;
    .text-content {
      h1 {
        font-size: 1.5em;
      }
      p {
        width: 100%;
      }
    }
  }
}

@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  .about-training {
    padding: 1em;
    .text-content {
      h1 {
        font-size: 1.7em;
      }
      p {
        width: 100%;
      }
    }
  }
}

  `],
})
export class AboutAsyncComponent {}
