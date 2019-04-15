import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isloggedin:boolean=false;
  constructor(public auth: AuthenticationService) {
    this.checklogin()
    
  }
  checklogin()
  {
    if(localStorage.getItem('mean-token'))
    {
     // console.log("hello there"JSON.stringify(localStorage.getItem('mean-token')));
      this.isloggedin=true;

    }
    
  }
}
