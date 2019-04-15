import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';

//import { Observable } from 'rxjs';

//import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './login.component.html' ,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  constructor(public toastr: ToastrManager,private auth: AuthenticationService, private router: Router,private spinnerService: Ng4LoadingSpinnerService) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
   
        /** spinner ends after 5 seconds */
    
      this.router.navigateByUrl('/todo');
    }, (err) => {
      this.toastr.errorToastr('Wrong Email or Password.', 'Oops!');
     //this.toastyService.error('Wrong Email or Password!', 'ERROR!');

      console.error(err);
    }); 
  }
}
