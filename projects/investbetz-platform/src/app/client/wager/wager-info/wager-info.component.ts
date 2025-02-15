import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-wager-info',
template: `
<div class="wager-info-container">

<div class="row">
  <div class="title col s12">
    <header>
        <h5>About Wager</h5>
        <div class="grey-text">Take the risk yourself</div>
    </header>
  </div>
</div>

<div class="row">

  <div class="col m4 s12">
    <h6>The Idea Behind Wager</h6>
    <p class="grey-text text-darken-1">
      Over the years, we have seen how people lose money to bookies. Though we know it's hard to always win since life itself is unpredictable, but its possible to make profit from waging. 
      After studying the strategy of the bookies and having access to the sophisticated technologies and resources they use to put the odds in their favour, we at Truzt Solutions brought together qualified team to come up with three categories of odd sets for each day. (morning, afternoon and evening). 
    </p>
    <p class="grey-text text-darken-1">
      The team does through research for each set of odds displayed each day and if its not worth it then no need to wager on it. Just like our vision statements says “to help you win today”
    </p>
    <p class="grey-text text-darken-1"> 
      Wagers is a feature introduced to cater for our users who doesn’t have the patient to wait for the gradual growth of funds placed in our platform. Very much unlike CashOut and CashUp, here the user bears the risk alone.
    </p>

    <a [routerLink]="['../']" class="btn waves-effect waves-red">Wager Now</a>
  </div>

  <div class="col m4 s12">
    <h6>Why You Should Use Our Wager</h6>
      <p class="grey-text text-darken-1">
        As the saying goes “Numbers don’t lie”, we belief in it as much as you do. That’s why we spend the time, resources and technologies to select odds displayed each day. 
        The team are seasoned and professional bettors who have proofed their worth over the years.
      </p>
      <p class="grey-text text-darken-2">
        Over the years, the team has delivered more than an 85% return on investment (ROI), as evidenced by the history of past wagers. 
        Our aim is to win consistently, regardless of the odds. We strive to provide consistent winnings to fulfill our promises to users.
      </p>

      <a [routerLink]="['../histories']" class="btn waves-effect waves-red">Wager Histories</a>
  </div>

  <div class="col m4 s12">
    <h6>Disclaimer</h6>
    <p class="grey-text text-darken-2">
      Knowing that we can’t assure users of continuous winnings. 
      We advise user to wager only the amount they are willing to lose.
    </p>
    <p class="grey-text text-darken-2">
      Wagering is at the user's risk, and we bear no responsibility for any losses. 
      Therefore, we advise users who cannot risk their money on wagers to use our CashOut or CashUp plans.
    </p>

    <a [routerLink]="['../../../profile/investments/plans']" class="btn waves-effect waves-red">Investment Plans</a>
  </div>

</div>
</div>

`,
styles: `
.wager-info-container {
    margin: 3em;
    header {
      h5 {
        margin-bottom: 0.2em;
      }
      div {
        margin-bottom: 2em;
        font-family: monospace;
      }
    }
  .row {
    .col {
      //h6 {}
      p {
        font-size: 0.9em;
        text-align: justify;
        margin-bottom: 2em;
      }
    }
  }
}

`,
imports: [RouterLink]
})
export class WagerInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
