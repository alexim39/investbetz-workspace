import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.scss'],
    imports: [RouterLink, FormsModule]
})
export class BankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
