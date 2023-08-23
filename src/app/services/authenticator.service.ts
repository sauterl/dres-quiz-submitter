import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {ApiRole, ApiUser, LoginRequest, UserRequest, UserService} from "../../../openapi/dres";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

/**
 * From dres/frontend
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {


  /** A {@link BehaviorSubject} that captures the current login-state. */
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)

  /**
   * Constructor
   */
  constructor(@Inject(UserService) private userService: UserService, private router: Router) {
    this.userService.getApiV2User()
        .subscribe({
          next: () => this._loggedIn.next(true),
          error: () => this._loggedIn.next(false),
          complete: () => console.log("Complete")
        }
    )
  }

  /**
   * Tries to login a user with the given username and password. Returns an Observable!
   *
   * @param user The username.
   * @param pass The password.
   */
  public login(user: string, pass: string) {
    return this.userService.postApiV2Login({ username: user, password: pass } as LoginRequest).pipe(
      mergeMap(() => this.userService.getApiV2User()),
      tap((data) => {
        this._loggedIn.next(true);
        console.log(`Successfully logged in as '${data.username}'.`)
      })
    );
  }

  /**
   * Tries to logout the current user. Returns an Observable!
   */
  public logout() {
    return this.userService.getApiV2Logout().pipe(
      catchError((e) => of(null)),
      tap(() => {
        this._loggedIn.next(false);
        console.log(`User was logged out.`)
      })
    );
  }

  /**
   * Returns the current login state as Observable.
   *
   * A call to this method always results in an API call to make sure,
   * that the user is still logged in.
   */
  get isLoggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable()
  }

  loggedIn(): boolean{
    return this._loggedIn.value
  }

  public canActivate(state: RouterStateSnapshot){
    const loggedIn = this.loggedIn();
    console.log("Login: ", loggedIn)
    if(loggedIn){
      return loggedIn;
    }else{
      return this.router.parseUrl(`/login?returnUrl=${state.url}`)
    }
  }
}
