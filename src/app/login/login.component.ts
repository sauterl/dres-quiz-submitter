import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticatorService} from "../services/authenticator.service";

/**
 * From dres/frontend, styling adopted
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  private returnUrl = '/evaluation/list';
  // @ts-ignore
    private authenticationServiceSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticatorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || '/quiz';
    this.authenticationServiceSubscription = this.authenticationService.isLoggedIn.subscribe((b) => {
      if (b) this.router.navigate([this.returnUrl]).then(r => {})
    });
  }

  ngOnDestroy(): void {
    this.authenticationServiceSubscription.unsubscribe();
  }

  public submit() {
    if (this.form.valid) {
      this.authenticationService.login(this.form.controls["username"].value, this.form.controls["password"].value).subscribe(
        (r) => this.router.navigateByUrl(this.returnUrl).then(r => this.snackBar.open(`Login successful!`, undefined, { duration: 5000 })),
        (err) => this.snackBar.open(`Login failed due to error: ${err?.error?.description}!`, undefined, { duration: 5000 })
      );
    }
  }
}
