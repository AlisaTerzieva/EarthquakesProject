import { Injectable } from "@angular/core";
import { 
  Router,
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from "@angular/router";
import { AuthService } from "../services/authentication/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router
  ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    return this.checkIfLogged(state.url);
  }

  checkIfLogged(url : string) {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(["/login"]);
    return false;
  }
}