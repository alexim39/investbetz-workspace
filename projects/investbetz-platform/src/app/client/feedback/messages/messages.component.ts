import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;
import {MessageService} from './messages.service'
import {MessageInterface} from './messages.interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, TitleCasePipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
selector: 'async-messages',
templateUrl: './messages.component.html',
styles: `
.msg-container {
  margin: 3em;
}

.table {
  font-size: 0.8em;
  tbody {
    tr {
      td {
        cursor: pointer;
        width: 10.5rem;
      }
    }
  }
}

.msg-list {
  /* background: #eee; */
  padding: 2em 1em;
  margin-top: -2.5rem;
  ul {
    li {
      max-height: 30rem;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
`,
imports: [RouterLink, NgFor, RouterOutlet,]
})
export class MessagesComponent implements OnInit {

  private clientId!: string;
  public sentMsgs!: [MessageInterface];
  public receivedMsgs!: [MessageInterface]
  // init empty response
  public isEmptyResponse!: Boolean;

  constructor(private auth: AuthService, private msgService: MessageService, private router: Router) { }

    // check for empty response
    private emptyResponse(array: any) {

      if (array.length === 0) {
        // array empty or does not exist
        this.isEmptyResponse = false;
      }else{
        this.isEmptyResponse = true;
      }
    }


  // client sent messages
  private clientSentMsgs(clientId: string) {
    this.msgService.getClientSentMsgs(clientId).subscribe((response: any) => {
      if (response.message === 'done') {
        // check empty response
        this.emptyResponse(response.data);

        // sort response by date
        this.sentMsgs = response.data.sort((a: any, b: any) => {
          return <any>new Date(b.msgDate) - <any>new Date(a.msgDate);
        });

      }
    }, (error) => {
      console.error(error);
    });
  }

  // client recived messages
  private clientReceivedMsgs(clientId: string) {
    this.msgService.getClientReceivedMsgs(clientId).subscribe((response: any) => {
      if (response.message === 'done') {
        // check empty response
        this.emptyResponse(response.data);

        // sort response by date
        this.receivedMsgs = response.data.sort((a: any, b: any) => {
          return <any>new Date(b.msgDate) - <any>new Date(a.msgDate);
        });

      }
    }, (error) => {
      console.error(error);
    });
  }

  public editMsg(msgId: string) {
    console.log(msgId)
  }

  ngOnInit() {
     // Load Current Client Details
     this.auth.profile().subscribe((user: any) => {
      const clientId = user._id;
      // call messages 
      this.clientSentMsgs(clientId);
      this.clientReceivedMsgs(clientId);
    }, (error: Error) => {
      console.error(error);
    })

    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
  }

}
