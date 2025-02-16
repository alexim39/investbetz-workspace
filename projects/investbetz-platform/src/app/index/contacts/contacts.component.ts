import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
//import Swal from 'sweetalert2';
import { ContactFormData } from './contacts.interface';
import { Subscription } from 'rxjs';
import { ContactService } from './contacts.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


/**
 * @title Customer feedback
 */
@Component({
  selector: 'async-contacts',
  standalone: true,
  providers: [ContactService],
  imports: [MatButtonModule, MatDividerModule, MatProgressBarModule, CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: "contacts.component.html",
  styleUrls: ['contacts.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;

  minDate = new Date(); // Today's date

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    this.isSpinning = true;

    // Mark all form controls as touched to trigger the display of error messages
    this.markAllAsTouched();

    if (this.contactForm.valid) {
      // Send the form value to your Node.js backend
     const formData: ContactFormData = this.contactForm.value;
      this.subscriptions.push(
        this.contactService.submit(formData).subscribe((res: any) => {
         /*  Swal.fire({
            position: "top-end",
            icon: 'success',
            text: 'Thank you for reaching out to us. We will respond to your message within the next few hours',
            showConfirmButton: false,
            timer: 10000
          }); */
          this.isSpinning = false;
          //this.router.navigateByUrl('get-started/connected-economy');
        }, (error: Error) => {
          this.isSpinning = false;
          /* Swal.fire({
            position: "top-end",
            icon: 'info',
            text: 'Server error occured, please try again',
            showConfirmButton: false,
            timer: 4000
          }); */
        })
      )
    } else {
     this.isSpinning = false;
    }
    
  }

  // Helper method to mark all form controls as touched
  private markAllAsTouched() {
    Object.keys(this.contactForm.controls).forEach(controlName => {
      this.contactForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}