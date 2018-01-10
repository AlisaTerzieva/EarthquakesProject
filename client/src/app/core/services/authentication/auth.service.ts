import { Injectable } from '@angular/core';

// Models
import { LoginInput } from '../../models/login.input.model';
import { RegisterInput } from '../../models/register.input.model';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const appKey = "kid_HJjpLj-EG";
const appSecret = "760f799cff4748bc81163412075e7fdb";
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`

@Injectable()
export class AuthService {
  private currentAuthtoken: string = localStorage.getItem('authtoken');
  public redirectUrl: string;
  public isAdmin: boolean;

  constructor(
    private httpService: HttpClientService,
    private router: Router
  ) { }

  login(loginModel: LoginInput) {
    return this.httpService.post(
      loginUrl,
      JSON.stringify(loginModel),
      this.createAuthHeaders('Basic')
    )
  }

  register(registerModel: RegisterInput): Observable<Object> {
    console.log("calling register service")
    return this.httpService.post(
      registerUrl,
      JSON.stringify(registerModel),
      this.createAuthHeaders('Basic')
    )
  }

  logout() {
    return this.httpService.post(
      logoutUrl,
      {},
      this.createAuthHeaders('Kinvey')
    )
  }

  isLoggedIn() {
    let authtoken: string = localStorage.getItem('authtoken');

    return authtoken === this.currentAuthtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  adminRole(role: string) {
    this.isAdmin = role === 'admin' ? true : false;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }

  tryNavigate() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else if (!this.isLoggedIn) {
      this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate([""]);
    }
  }
}