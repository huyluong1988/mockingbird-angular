import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  template: `
    <form (ngSubmit)="signup()">
      <input [(ngModel)]="first_name" name="first_name" placeholder="First Name" required />
      <input [(ngModel)]="last_name" name="last_name" placeholder="Last Name" required />
      <input [(ngModel)]="email" name="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    @if (error) {
      <div>{{ error }}</div>
    }
  `,
  standalone: true,
  imports: [FormsModule]
})
export class SignupComponent {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup({ first_name: this.first_name, last_name: this.last_name, email: this.email, password: this.password })
      .subscribe({
        next: (user: any) => {
          this.auth.setUser(user);
          this.router.navigate(['/']);
        },
        error: err => {
          this.error = err.error?.message || 'Signup failed';
        }
      });
  }
} 