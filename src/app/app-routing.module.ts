import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {QuizAnswerComponent} from "./quiz-answer/quiz-answer.component";
import {QuizAnswerTailwindComponent} from "./quiz-answer-tailwind/quiz-answer-tailwind.component";
import {isLoggedIn} from "./services/guard";

const routes = [
    {path: 'login', component: LoginComponent},
    {path: 'quiz', component: QuizAnswerComponent, canActivate: [isLoggedIn]},
    {path: 'quiz2', component: QuizAnswerTailwindComponent},
    {path: '', redirectTo: 'quiz', pathMatch: 'full'}
] as Routes


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
