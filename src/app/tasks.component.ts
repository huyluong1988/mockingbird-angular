import { Component, OnInit, signal } from '@angular/core';
import { TaskService, Task } from './task.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  template: `
    <button routerLink="/home">Back to Home</button>
    <h2>Task Management</h2>

    @if (authService.user()) {
      <h3>Create New Task / Edit Task</h3>
      <form (ngSubmit)="saveTask()">
        <input [(ngModel)]="currentTask.title" name="title" placeholder="Task Title" required />
        <textarea [(ngModel)]="currentTask.description" name="description" placeholder="Task Description"></textarea>
        <select [(ngModel)]="currentTask.status" name="status" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input type="date" [(ngModel)]="currentTask.due_date" name="due_date" placeholder="Due Date" />
        <button type="submit">{{ isEditing() ? 'Update Task' : 'Create Task' }}</button>
        @if (isEditing()) {
          <button type="button" (click)="cancelEdit()">Cancel Edit</button>
        }
      </form>

      <h3>Your Tasks</h3>
      @if (tasks().length === 0) {
        <p>No tasks yet. Create one!</p>
      } @else {
        <ul>
          @for (task of tasks(); track task.id) {
            <li>
              {{ task.title }} ({{ task.status }}) {{ task.due_date ? 'Due: ' + task.due_date : '' }}
              <button (click)="editTask(task)">Edit</button>
              <button (click)="deleteTask(task.id!)">Delete</button>
            </li>
          }
        </ul>
      }
    } @else {
      <p>Please <a routerLink="/login">log in</a> to view and manage tasks.</p>
    }
  `,
  standalone: true,
  imports: [FormsModule, RouterLink]
})
export class TasksComponent implements OnInit {
  tasks = signal<Task[]>([]);
  currentTask: Task = { title: '', status: 'active', due_date: '' }; // Default status to active, initialize due_date
  isEditing = signal(false);

  constructor(private taskService: TaskService, public authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Load tasks only if user is logged in
    if (this.authService.user()) {
      this.loadTasks();
    } else {
      // Optionally redirect to login if not logged in
      this.router.navigate(['/login']);
    }
  }

  loadTasks() {
    const userId = this.authService.user()?.id;
    if (userId) {
      this.taskService.getTasks(userId).subscribe({
        next: (tasks) => this.tasks.set(tasks),
        error: (err) => console.error('Error loading tasks:', err)
      });
    } else {
      console.error('Cannot load tasks: User ID not available.');
    }
  }

  saveTask() {
    // Ensure user_id is set before sending to API
    if (this.authService.user()) {
      this.currentTask.user_id = this.authService.user().id;
    } else {
      // Handle case where user is somehow not logged in but trying to save (should be prevented by @if in template)
      console.error('User not logged in, cannot save task.');
      return;
    }

    if (this.isEditing() && this.currentTask.id) {
      this.taskService.updateTask(this.currentTask.id, this.currentTask).subscribe({
        next: (updatedTask) => {
          this.tasks.update(tasks => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
          this.resetForm();
        },
        error: (err) => console.error('Error updating task:', err)
      });
    } else {
      this.taskService.createTask(this.currentTask).subscribe({
        next: (newTask) => {
          this.tasks.update(tasks => [...tasks, newTask]);
          this.resetForm();
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }

  editTask(task: Task) {
    this.currentTask = { ...task };
    // Handle date format for input[type=date] if coming from backend as string
    if (this.currentTask.due_date) {
      this.currentTask.due_date = new Date(this.currentTask.due_date).toISOString().split('T')[0];
    }
    this.isEditing.set(true);
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== id));
      },
      error: (err) => console.error('Error deleting task:', err)
    });
  }

  private resetForm() {
    this.currentTask = { title: '', status: 'active', due_date: '' };
    this.isEditing.set(false);
  }
} 