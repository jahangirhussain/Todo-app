import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if(!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    
   return true
  }
 
  
}
@Injectable()
export class checkLoggedin implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if(this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/todo');
      return false;
    }
    
   return true
  }
 
  
}
