import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.authService.logout()
      .subscribe(data => {
        this.toastr.success('You have successfully logged out!', 'Success', { dismiss: 'controlled', showCloseButton: true })
        localStorage.clear();
        this.router.navigate(['/login']);
      })
  }
}