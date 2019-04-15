import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PagerService } from './index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { checkLoggedin } from './auth-guard.service';
import { TodoService } from './todo/todo.service';
import { TodoComponent } from './todo/todo.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';



const routes: Routes = [
  { path: '', component: TodoComponent , canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuardService] },

  { path: 'login', component: LoginComponent,canActivate: [checkLoggedin] },
  { path: 'register', component: RegisterComponent,canActivate: [checkLoggedin] },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TodoComponent,
    
  ],
  imports: [
     BrowserAnimationsModule,    
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
  
    AuthenticationService, 
    AuthGuardService,
    TodoService,
    PagerService,
    checkLoggedin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
