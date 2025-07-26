import { Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { TasksComponent } from './tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to /home
  { path: 'home', component: HomeComponent }, // Now points to HomeComponent
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksComponent }, // Now uncommented
];
