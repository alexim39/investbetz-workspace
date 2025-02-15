import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
// Declare jquery as any
declare const $: any;
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewMessageInterface} from './new-msg.interface';
import {NewMessageService} from './new-msg.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'app-new-msg',
    templateUrl: './new-msg.component.html',
    styleUrls: ['./new-msg.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [RouterLink, FormsModule, ReactiveFormsModule]
})
export class NewMsgComponent implements OnInit {
  
  // form Values
  public msgForm: FormGroup;
  private clientId!: string;

  constructor(private auth: AuthService, private msgService: NewMessageService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    // formGroup
    this.msgForm = this.fb.group({
      'msgSubject': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'msgContent': [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'msgCatetory': [null, Validators.compose([
        Validators.required,
        //Validators.minLength(2)
      ])]
    });
   }

   public msgSubmit(post: NewMessageInterface) {
    
    const postObj: NewMessageInterface = {
      // Member properties
      senderId: this.clientId,
      msgSubject: post.msgSubject,
      msgContent: post.msgContent,
      msgCatetory: post.msgCatetory
    }

    this.msgService.saveMsg(postObj).subscribe( (response: any) => {
      if (response.message === 'done') {

        this.snackBar.open(`Thanks for sending us a message, will get back to you soon`, 'Close', { 
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
    // Set Label Active For Materialize form: Make lable clear off the form
    $('.to').addClass('active');
    $('select').formSelect();

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
    }, (error: Error) => {
      console.error(error)
    })
  }

}
