import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appAppPasswordToggle]' })

export class AppPasswordToggleDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = '<i class="fas fa-eye-slash password-toggle"></i>'; // Show Password
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<i class="fas fa-eye password-toggle"></i>';
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = '<i class="fas fa-eye password-toggle"></i>'; // Hide Password
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

}
