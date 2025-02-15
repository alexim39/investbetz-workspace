import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { WagerClass } from './wager.class';
import {ThemePalette} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { WagerMorningComponent } from './wager-morning/wager-morning.component';
import { WagerNoonComponent } from './wager-noon/wager-noon.component';
import { WagerNightComponent } from './wager-night/wager-night.component';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-wager',
    templateUrl: './wager.component.html',
    styleUrls: ['./wager.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [RouterLink, WagerMorningComponent, WagerNoonComponent, WagerNightComponent]
})
export class WagerComponent extends WagerClass implements OnInit {

  constructor() {
    super();
  }

  
  ngOnInit() {

    // init tab
    $('.tabs').tabs({
      duration: 3000
    });

    // Init tooltipped
    $('.tooltipped').tooltip();
    
    // close alert box
    $('.alert-closebtn').click(() => {
      $('.alert').fadeOut(1000);
    });
  }

}
