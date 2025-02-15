import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, RouterLink } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';
import {MessageService} from './../messages.service'
import { MessageInterface } from './../messages.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-read-msg',
    templateUrl: './read-msg.component.html',
    styleUrls: ['./read-msg.component.scss'],
    imports: [RouterLink, TitleCasePipe]
})
export class ReadMsgComponent implements OnInit {
  public msg!: MessageInterface;

  constructor(private msgService: MessageService, private route: ActivatedRoute) { }

  // capitalize first letter of string
  public titleCaseWord(word: string = 'everywordshouldbefirst') {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  private loadMsg(msgId: string) {
    this.msgService.getOneMessage(msgId).subscribe((response: any) => {
      if (response.message === 'done') {
        this.msg = response.data;
      }
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // call method
      this.loadMsg(params['selected']);
    });
  }

}
