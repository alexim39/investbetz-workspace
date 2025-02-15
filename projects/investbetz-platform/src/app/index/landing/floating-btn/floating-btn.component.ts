import { Component } from '@angular/core';

@Component({
  selector: 'async-floating-btn',
  imports: [],
  template: `
   <div class="fixed-action-btn horizontal click-to-toggle">
      <a class="btn-floating pulse btn-large red">
          <i class="material-icons">menu</i>
      </a>
      <ul>
        <li title="Chat">
            <a class="waves-effect waves-red btn-floating red darken-1"><i class="material-icons">chat</i></a>
        </li>
          <li title="Facebook">
              <a class="waves-effect waves-red btn-floating indigo"><i class="fab fa-facebook-f"></i></a>
          </li>
          <li title="Twitter">
              <a class="waves-effect waves-red btn-floating blue"><i class="fab fa-twitter"></i></a>
          </li>
          <li title="Youtube">
              <a class="waves-effect waves-red btn-floating red darken-3"><i class="fab fa-youtube"></i></a>
          </li>
      </ul>
    </div>
  `,
  styles: ``
})
export class FloatingBtnComponent {}
