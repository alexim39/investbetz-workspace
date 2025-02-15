import { Routes } from '@angular/router';

import { TestimonialComponent } from './testimonial/testimonial.component';
import { NewMsgComponent } from './messages/new-msg/new-msg.component';
import { MessagesComponent } from './messages/messages.component';

export const FeedbackRouting: Routes = [
  {
    path: 'feedback',
    children: [
      { path: '', redirectTo: 'messages', pathMatch: 'full' },
      {
        path: 'messages', component: MessagesComponent,
        children: [
          { path: 'new', component: NewMsgComponent },
          //{ path: 'view/:selected', component: ReadMsgComponent },
        ]
      },
      { path: 'testimonial', component: TestimonialComponent }
    ]
  },
];


/* 
 { path: 'feedback',
      children: [
        { path: '', redirectTo: 'messages', pathMatch: 'full'},
        { path: 'messages', component: MessagesComponent,
          children: [
            { path: 'new', component: NewMsgComponent },
            { path: 'view/:selected', component: ReadMsgComponent },
          ]
        },
        { path: 'testimonial', component:  TestimonialComponent}
      ]
     } */
