import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;
import { trigger, state, style, animate, transition } from '@angular/animations';
import {WagerService} from './../wager.service';
import {WagerInterface} from './../wager.interface';
import { formatDate, DatePipe, NgIf, NgClass, NgFor, UpperCasePipe, TitleCasePipe, KeyValuePipe } from "@angular/common";
import {WagerClass} from './../wager.class';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


@Component({
    selector: 'app-wager-histories',
    templateUrl: './wager-histories.component.html',
    styleUrls: ['./wager-histories.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [MatFormField, MatLabel, MatInput, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, NgIf, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, NgFor, TitleCasePipe, DatePipe, KeyValuePipe]
})
export class WagerHistoriesComponent extends WagerClass implements OnInit {

  public wagers!: MatTableDataSource<[WagerInterface]>;
  public statisticalWagers!: Array<[WagerInterface]>;
  private session!: string;
  private avLose!: number;
  private aveRunning!: number;
  public wagerDetails: any; // | WagerInterface;
  public showDetails!: boolean;

  displayedColumns: string[] = ['Sn', 'odds', 'DatesSession', 'status', 'game', 'viewGames'];

  constructor(private wagerService: WagerService) { 
    super();
  }

  private wager(): void {

    this.wagerService.getWagers().subscribe((response) => {
      if (response.message === 'done') {

        // loop through response to get date
        for (let wager of response.wager) {
          // format the fullDate property of response to get time
          const formattedTime = new DatePipe('en-US').transform(new Date(Number(wager.fullDate)), 'shortTime');
          
          if (formattedTime == '11:59 PM') {
            this.session = 'Evening session';


          } if (formattedTime == '4:00 PM') {
            this.session = 'Afternoon session';

          } if (formattedTime == '12:00 PM') {
            this.session = 'Morning session';

          }
          // update wager objects with new session property
          wager['session'] = this.session;

          if (super.isInArray(wager.games.game, 'lose')) {
            //return true;
            // update wager objects with new status property
            wager['status'] = 'Losed';
            wager['showDetails'] = true;
          } else if (super.isInArray(wager.games.game, 'win')) {
            //return false;
            // update wager objects with new status property
            wager['status'] = 'Won';
            wager['showDetails'] = true;
          } else {
            wager['status'] = '<span class="grey-text">Running</span>';
            wager['showDetails'] = false;
          }

          // call viewGames() to init it on view with wager contents
          this.viewGames(wager);

        }

        // for statistics calculation only
        this.statisticalWagers = response.wager;


        // sort response by date
        const sortedResult = response.wager.sort((a: WagerInterface, b: WagerInterface) => {
          // Number(a.fullDate); // cast it to a Number
          return <any>new Date(Number(b.fullDate)) - <any>new Date(Number(a.fullDate));
        });

        // Assign the data to the data source for the table to render
        this.wagers = new MatTableDataSource(sortedResult);

      }
    }, (error) => {
      console.error(error);
    });
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.wagers.filter = filterValue.trim().toLowerCase();
  }

  // for dynamic css diaplay: losed
  public losedWager(wager: any) {
    if (super.isInArray(wager.games.game, 'lose')) {
      return true;

    } else {
      return null;
    }
  }

  // for dynamic css display: won
  public wonWager(wager: any) {
    if (super.isInArray(wager.games.game, 'lose')) {
      return null;

    } else if (super.isInArray(wager.games.game, 'win')) {
      return true;
    } else {
      return null;
    }
  }

  // Percentage losed
  public averageLose(wagers: any): string {

    const totalCount: number = wagers.length;
    let count: number = 0;

    // loop through response to get date
    for (let i = 0; i < wagers.length; i++) {
      //console.log(wagers[i]);

      if (super.isLosed(wagers[i]) === true) {
        // losed
        count++;
      } 
    }

    this.avLose =  count / totalCount;
    const a =  ( count / totalCount );
    return a.toFixed(1) + '%';
  }

  // Percentage running
  public averageRunning(wagers: any) {
    const totalCount: number = wagers.length;
    let count: number = 0;

    // loop through response to get date
    for (let i = 0; i < wagers.length; i++) {
      //console.log(wagers[i]);

      if (super.isRunning(wagers[i]) === true) {
        // losed
        count++;
      } 
    }

    this.aveRunning =  count / totalCount;
    const a =  ( count / totalCount );
    return a.toFixed(1) + '%';
  }

    // percentage won
    public averagWins(): string {
      const a = 1 - (this.aveRunning + this.avLose);
      return  a.toFixed(1)+ '%';
      
    }

  // games details
  public viewGames(wager: any): void {
    this.wagerDetails = wager;
  }

  ngOnInit(): void {
    this.wager();

    // init modal
    $('.modal').modal();
  }

}
