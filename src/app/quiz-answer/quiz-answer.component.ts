import {Component, OnDestroy} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DresService} from "../services/dres.service";

export interface QuizAnswerSpecs {
  label: string;
  colour: string;
  value: string;
  button: ThemePalette;
}

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './quiz-answer.component.html',
  styleUrls: ['./quiz-answer.component.css']
})
export class QuizAnswerComponent implements OnDestroy {

  gutter = ''+32;
  typographyCls = 'mat-h1'

  destroyed = new Subject<void>();

  nbCols: Observable<number> = new Observable<number>(subscriber => subscriber.next(2));
  constructor(breakpointObserver: BreakpointObserver, private dresService: DresService) {
    this.nbCols = breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Large,
        Breakpoints.HandsetLandscape
      ])
      .pipe(takeUntil(this.destroyed), map(br => {
        const landscape = breakpointObserver.isMatched('(orientation: landscape)')
        console.log("Orientation: ", landscape)
        console.log("Br", br.breakpoints)
        if(br.breakpoints[Breakpoints.Medium] || br.breakpoints[Breakpoints.Large]){
          // Medium upwards
          this.gutter = '24';
          this.typographyCls = "mat-headline-2"
          return 2;
        }else if(br.breakpoints[Breakpoints.Small] && !landscape){
          // Small Portrait
          this.gutter = '16';
          this.typographyCls = "mat-h1"
          return 1;
        }else if(br.breakpoints[Breakpoints.HandsetLandscape]){
          this.gutter = '4';
          this.typographyCls = "mat-headline-3"
          return 2
        }else{
          console.log("fallback")
          this.gutter = '8';
          return 1;
        }
      }));
  }

  buttons = [
    {
      label: 'A', colour: 'red', value: 'a', button: undefined,
    },
    {
      label: 'B', colour: 'amber', value: 'b', button: 'primary',
    },
    {
      label: 'C', colour: 'green', value: 'c', button: 'accent',
    },
    {
      label: 'D', colour: 'blue', value: 'd', button: 'warn'
    }
  ] as QuizAnswerSpecs[];

  public submit(value: string) {
    console.log("Value: ", value);
    this.dresService.submit(value);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
