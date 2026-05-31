# Campus Planner

A student productivity web app with course management, assignment tracking, a scheduling calendar, and user authentication. Deployed on GitHub Pages.

**Live Demo:** [tekeyahbennett-coder.github.io/Study-App](https://tekeyahbennett-coder.github.io/Study-App)

---

## Features

- **User Authentication** — Sign-up and login with password validation and localStorage session persistence
- **Dashboard** — Central hub with an overview of upcoming assignments, enrolled courses, and notifications
- **Course Management** — Add, view, and manage enrolled courses with course codes and details
- **Assignment Tracking** — Add assignments per course with due dates; mark as complete
- **Scheduling Calendar** — Visual calendar for managing deadlines and scheduled events
- **Notifications** — In-app notification system for reminders and alerts
- **Shared Navigation** — Consistent sidebar navigation across all pages via shared.js

---

## Tech Stack

| Layer | Technology |
|---|---|
| Languages | HTML, CSS, JavaScript |
| Styling | Custom CSS (main.css) |
| Storage | localStorage (client-side persistence) |
| Deployment | GitHub Pages |
| Architecture | Multi-page application (MPA) |

---

## Project Structure

```
Study-App/
├── index.html           # Login / landing page
├── signup.html          # Account creation
├── password.html        # Password reset
├── dashboard.html       # Main overview dashboard
├── course.html          # Course management
├── addAssignment.html   # Add new assignment
├── calendar.html        # Scheduling calendar
├── notifications.html   # Notification center
├── shared.js            # Shared navigation and session logic
└── main.css             # Global styles
```

---

## How to Run Locally

No build step required — open any HTML file directly in a browser, or use Live Server:

```bash
git clone https://github.com/tekeyahbennett-coder/Study-App.git
cd Study-App
# Open index.html in your browser, or use VS Code Live Server
```

---

## Author

**Te'Keyah Bennett** — [GitHub](https://github.com/tekeyahbennett-coder) | [Portfolio](https://tekeyahbennett-coder.github.io)
