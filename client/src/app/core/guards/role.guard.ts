import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      !this.auth.isAdmin  
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}