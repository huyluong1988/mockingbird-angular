import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  template: `
    <h2>Welcome to Mocking-Bird Tasks!</h2>
    <nav>
      @if (!authService.user()) {
        <button routerLink="/signup">Sign Up</button>
        <button routerLink="/login">Login</button>
      } @else {
        <span>Welcome, {{ authService.user()?.first_name || authService.user()?.email }}</span>
        <button (click)="logout()">Logout</button>
        <button routerLink="/tasks">My Tasks</button> <!-- Add this for future task management page -->
      }
    </nav>
  `,
  standalone: true,
  imports: [RouterLink]
})
export class HomeComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 