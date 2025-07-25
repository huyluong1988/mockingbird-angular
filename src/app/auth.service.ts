import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<any>(null);
  private apiUrl = 'http://localhost:3000'; // Adjust as needed

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: { first_name: string; last_name: string; email: string; password: string }) {
    console.log(data);
    return this.http.post(`${this.apiUrl}/signup`, {
        user: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password
        }
    });
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  logout() {
    // If your backend supports a logout endpoint, call it here
    // For now, just clear the user
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  setUser(user: any) {
    this.user.set(user);
  }
} 