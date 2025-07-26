# MockingBirdTasksApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


### 📱 Mobile App Packaging with Capacitor

I used Capacitor to package the Angular frontend into a native mobile app.

Steps followed:
1. Built the Angular app using `ng build`.
2. Npm install @capacitor/core @capacitor/cli
3. Initialized Capacitor with `npx cap init`.
4. Set `"webDir": "dist/mocking-bird-tasks-app-mobile"` in `capacitor.config.ts`.
5. Added Android and iOS platforms with `npx cap add android` and `npx cap add ios`. (did not do)
6. Used `npx cap open android` to run the mobile app in Android Studio. (did not do)

This setup allows the Angular frontend to run as a native mobile app, with the potential to integrate native plugins if needed.


## 🧠 Engineering Notes

This section outlines the technical decisions and implementation details for both the frontend and backend portions of the assignment.

---

### 🧩 Frontend (Angular)

- All component files and services are currently located under the root `app/` directory.
  - In a production environment, I would refactor this into domain-specific subdirectories for better scalability and maintainability.
  
- **Key Features Implemented:**
  - ✅ **Unique Email Validation**: Users must register with a unique email address.
  - ✅ **Login Error Handling**: Incorrect passwords result in a failed login attempt with feedback.
  - ✅ **Route Protection**: Unauthenticated users trying to access `/tasks` are redirected to the login page.
  - ✅ **Conditional UI Rendering**: The "Tasks" button is only visible to authenticated users.
  - ✅ **Basic Auth Handling**: For simplicity, authentication is managed by storing the user object in memory on the frontend. This object is cleared on logout.

> ⚠️ Note: I did not implement JWT-based authentication or secure token handling, as it was out of scope for this assignment. In a production setting, I would implement token-based auth for better security.

---

### 🔧 Backend (Ruby)

- Follows a standard MVC architecture: `routes → controllers → models → database`.
  
- **Task Status Modeling:**
  - The current implementation uses a `status` field as a free-form string due to time constraints.
  - Presently, tasks are created with values like `active` or `inactive`, but there are no database constraints enforcing specific values.
  - In production, I would define a strict enum with values such as:
    - `todo`
    - `in_progress`
    - `blocked`
    - `completed`
    - `archived`
  - I avoided using a boolean field (`is_complete`) because it doesn't scale well for workflows with more than two states.

---

### 🗃️ Data Modeling

I designed two main entities:

#### `User`
- Represents the person creating or being assigned tasks.
- A user can have many tasks.

#### `Task`
- Represents a unit of work (e.g., a chore or project).
- Fields:
  - `title` (string)
  - `description` (text)
  - `due_date` (date)
  - `status` (string; will become an enum in a future iteration)

---

Let me know if you'd like to see the mobile packaging notes (Capacitor) added to this `README.md` as well.
