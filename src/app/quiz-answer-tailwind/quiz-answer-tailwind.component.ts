import { Component } from '@angular/core';
import {QuizAnswerSpecs} from "../quiz-answer/quiz-answer.component";
export interface QuizAnswerTailwindSpecs{
  label: string;
  colour: string;
  value: string;}
@Component({
  selector: 'app-quiz-answer-tailwind',
  templateUrl: './quiz-answer-tailwind.component.html',
  styleUrls: ['./quiz-answer-tailwind.component.css']
})
export class QuizAnswerTailwindComponent {
  buttons = [
    {
      label: 'A', colour: 'red', value: 'a'
    },
    {
      label: 'B', colour: 'amber', value: 'b'
    },
    {
      label: 'C', colour: 'green', value: 'c'
    },
    {
      label: 'D', colour: 'blue', value: 'd'
    }
  ] as QuizAnswerSpecs[];

  public submit(value: string){
    console.log("Value: ", value);
  }
}
