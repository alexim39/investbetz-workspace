import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NewMessageService} from './new-msg.service';
import { NewMsgComponent } from './new-msg.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NewMsgComponent
    ],
    exports: [
        NewMsgComponent,
    ],
    providers: [NewMessageService]
})
export class NewMsgModule { }
