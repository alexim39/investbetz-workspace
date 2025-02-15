import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [RouterLink, FormsModule, ReactiveFormsModule]
})
export class FooterComponent implements OnInit {

  newsLetterForm = new FormGroup({
    newsLetterEmail: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

}
