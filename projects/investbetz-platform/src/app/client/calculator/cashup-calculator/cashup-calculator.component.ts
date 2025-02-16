import { Component, OnInit } from '@angular/core';
import { CalculatorClass } from './../calculator.class';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cashup-calculator',
  templateUrl: './cashup-calculator.component.html',
  styleUrls: ['./cashup-calculator.component.scss'],
  imports: [FormsModule, RouterLink, CurrencyPipe]
})
export class CashupCalculatorComponent extends CalculatorClass implements OnInit {

  cashupField: number | undefined = undefined;
  cashupSelect: number | undefined = undefined;
  cashupProfit: number = 0;
  cashupPayout: number = 0;
  cashupPercentage: number;

  cashupBtn: boolean = true;

  constructor() {
    super();
    this.cashupPercentage = super.get_X_Percent(1);
  }

  public getCashup() {

    if (this.cashupField === undefined || this.cashupSelect === undefined || isNaN(this.cashupField) || isNaN(this.cashupSelect)) {
      this.cashupBtn = true;
      this.cashupProfit = 0;
      this.cashupPayout = 0;
      return;
    }

    const value = this.cashupField;
    this.cashupProfit = this.cashupPercentage * value * this.cashupSelect;
    this.cashupPayout = this.cashupProfit + value;

    if (value >= 3000 && value <= 100000) {
      this.cashupBtn = false;
    } else {
      this.cashupBtn = true;
    }
  }

  ngOnInit(): void {
  }
}