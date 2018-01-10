import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { RegisterInput } from '../../../core/models/register.input.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerInputModel: RegisterInput;
  public registeredUser: string;
  public submitted: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastsManager) {
    this.registerInputModel = new RegisterInput("", "", "", "");
  }

  register() {
    this.submitted = true;
    this.authService.register(this.registerInputModel)
      .subscribe(data => { this.successfulRegister(data) }, err => { this.submitted = false; this.toastr.error('An error occured!', null, { dismiss: 'controlled', showCloseButton: true }) })
  }


  successfulRegister(data): void {
    this.submitted = false;
    this.toastr.success('Successfully registered! You can log in now.', 'Success', { dismiss: 'controlled', showCloseButton: true })
    this.registeredUser = data['username'];
    this.router.navigate(['/login']);
  }
}