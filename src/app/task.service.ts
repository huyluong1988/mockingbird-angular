import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  user_id?: number; // Added to match Ruby model
  due_date?: string; // Added due_date
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTasks(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/users/${userId}/tasks`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task`, { task });
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/task/${id}`, { task });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/task/${id}`);
  }
} 