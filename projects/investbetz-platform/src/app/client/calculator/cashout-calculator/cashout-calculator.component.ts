import { Component, OnInit } from '@angular/core';
import { CalculatorClass } from './../calculator.class';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cashout-calculator',
  templateUrl: './cashout-calculator.component.html',
  styleUrls: ['./cashout-calculator.component.scss'],
  imports: [FormsModule, RouterLink, CurrencyPipe]
})
export class CashoutCalculatorComponent extends CalculatorClass implements OnInit {

  cashoutField!: number;
  cashoutProfit: number = 0; // Initialize directly
  cashoutPayout: number = 0; // Initialize directly
  cashoutPercentage: number;

  cashoutBtn: boolean = true; // Initialize directly

  constructor() {
    super();
    this.cashoutPercentage = super.get_X_Percent(2);
  }

  public getCashout(value: string) { // Accept string as input
    const numValue = Number(value); // Convert string to number

    if (isNaN(numValue)) { // Handle invalid input (e.g., non-numeric characters)
      this.cashoutProfit = 0;
      this.cashoutPayout = 0;
      this.cashoutBtn = true;
      return; // Stop further calculation
    }


    this.cashoutProfit = this.cashoutPercentage * numValue * 6;
    this.cashoutPayout = this.cashoutProfit + numValue; // cashoutField is not used in the calculation

    if (numValue >= 5000 && numValue <= 100000) {
      this.cashoutBtn = false;
    } else {
      this.cashoutBtn = true;
    }
    this.cashoutField = numValue; // Update cashoutField with the numeric value
  }

  ngOnInit(): void {
  }
}