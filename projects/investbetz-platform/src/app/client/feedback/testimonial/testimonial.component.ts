import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// declare jquery as any
declare const $: any;
import {TestimonialService} from './testimonial.service';
import { TestimonialInterface } from './testimonial.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-testimonial',
    templateUrl: './testimonial.component.html',
    styleUrls: ['./testimonial.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [FormsModule, ReactiveFormsModule]
})
export class TestimonialComponent implements OnInit {
  // form Values
  public testimonialForm: FormGroup;
  private clientId!: string;


  constructor(private auth: AuthService, private testimonialService: TestimonialService, private fb: FormBuilder, private snackBar: MatSnackBar) { 
    // testimonialForm formGroup
    this.testimonialForm = this.fb.group({
      'situationBefore': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'resultsFromService': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'coreProblem': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'whatHesitation': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        //Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$') // Must have a character and digit
      ])],
      'specificFeatures': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'recommendation': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'anythingElse': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'testimonialCheck': [true, Validators.compose([
        //Validators.requiredTrue
      ])],
    });
  }

  public testimonialSubmit(post: TestimonialInterface){
    
    const postObj: TestimonialInterface = {
      // Member properties
      clientId: this.clientId,
      situationBefore: post.situationBefore,
      resultsFromService: post.resultsFromService,
      coreProblem: post.coreProblem,
      whatHesitation: post.whatHesitation,
      specificFeatures: post.specificFeatures,
      recommendation: post.recommendation,
      anythingElse: post.anythingElse,
      testimonialCheck: post.testimonialCheck,
    }

    // Call service method
    this.testimonialService.saveTestimonial(postObj).subscribe( (response: any) => {
      if (response.message === 'done') {

        this.snackBar.open(`Thanks for filling out our testimonial form`, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'success']
         });
      }    
      
    }, (error) => {
      this.snackBar.open(error.error.message, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       }); 
    });

  }

  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
    }, (error: Error) => {
      console.error(error)
    })
  }

}
