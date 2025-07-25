import { Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
