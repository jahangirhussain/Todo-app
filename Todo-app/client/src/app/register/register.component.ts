import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) {}

  register() {
    this.spinnerService.show();
    this.auth.register(this.credentials).subscribe(() => {
      setTimeout(()=>this.spinnerService.hide(),1000)

      this.router.navigateByUrl('/todo');
    }, (err) => {
      console.error(err);
    });
  }
}
