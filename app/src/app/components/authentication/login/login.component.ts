import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { LoginInput } from '../../../core/models/login.input.model';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginInputModel: LoginInput;
  public loginSuccess: boolean = false;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastsManager) {
    this.loginInputModel = new LoginInput("", "");
  }

  login(): void {
    this.authService.login(this.loginInputModel)
      .subscribe(data => { this.successfulLogin(data) }, err => { this.toastr.error('Login failed!', 'Error', { dismiss: 'controlled', showCloseButton: true }) })
  }


  successfulLogin(data): void {
    this.toastr.success('You have successfully logged in!', 'Success', { dismiss: 'controlled', showCloseButton: true });
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.authService.adminRole(data['role']);
    console.log(this.authService.isAdmin)
    this.loginSuccess = true;
    this.router.navigate(['/overview']);
  }
}