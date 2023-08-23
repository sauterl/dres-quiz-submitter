import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {QuizAnswerComponent} from './quiz-answer/quiz-answer.component';
import {RouterOutlet} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {QuizAnswerTailwindComponent} from './quiz-answer-tailwind/quiz-answer-tailwind.component';
import {ApiModule, Configuration} from "../../openapi/dres";
import {AuthenticatorService} from "./services/authenticator.service";
import {DresService} from "./services/dres.service";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        QuizAnswerComponent,
        QuizAnswerTailwindComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterOutlet,
        MatGridListModule,
        AppRoutingModule,
        MatButtonModule,
        HttpClientModule,
        ApiModule.forRoot(() => {
            return new Configuration({
                basePath: 'http://localhost:8080', withCredentials: true
            })
        }),
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule
    ],
    providers: [AuthenticatorService, DresService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
