# Modern Public Inter College

A full-stack school management and public website built with React and Spring Boot. The application provides a modern public-facing website for the college along with a teacher portal for managing school activities.

## Features

- Responsive public website with pages for Home, About, Academics, Admissions, Faculty, Gallery, Notices, Contact, and Enquiries
- Admission and enquiry forms for prospective students
- Teacher login and dashboard access
- Notice, homework, note, and student-related management APIs
- File upload support for documents and media
- Secure authentication using Spring Security and JWT
- MySQL-backed persistence with JPA/Hibernate

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Shadcn UI components
- Axios
- Framer Motion

### Backend
- Java 17
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- MySQL
- JWT authentication
- Maven

## Project Structure

- frontend/: React + Vite frontend application
- backend/demo/: Spring Boot backend API
- uploads/: uploaded files directory

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ and npm
- Java 17+
- MySQL 8+
- Maven

## Backend Setup

1. Create a MySQL database named `school_db`.
2. Update your database credentials in [backend/demo/src/main/resources/application.properties](../backend/demo/src/main/resources/application.properties) if needed.
3. Run the backend:

```bash
cd backend/demo
./mvnw spring-boot:run
```

The backend will run on http://localhost:8080.

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open http://localhost:5173 in your browser.

## GitHub Pages Deployment

The frontend is configured to deploy from the `main` branch with GitHub Actions. Push the repository to GitHub, then in the repository settings select **Pages** and set the build source to **GitHub Actions**. The site will be published at:

https://rish100abh.github.io/school-website-project/

To enable login and API-backed forms on the published site, deploy `backend/demo` to an HTTPS-capable Java host and add a repository variable named `VITE_API_BASE_URL` under **Settings > Secrets and variables > Actions > Variables**. Set it to the backend API base URL, including `/api` (for example, `https://your-api-host.example/api`). The backend must allow the Pages site origin through CORS. GitHub Pages hosts only the frontend; without this backend, login and data submissions are unavailable.

Configure the backend host with `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and `CORS_ALLOWED_ORIGINS`. Use a new, long random JWT secret and set `CORS_ALLOWED_ORIGINS` to `https://rish100abh.github.io`. Never use the local development JWT fallback in production. The database credentials previously committed in this repository should be rotated immediately, because removing them from the current file does not remove them from Git history.

### Development Login Accounts

On a fresh local database, the backend seeds `admin` / `admin123` and `teacher1` / `teacher123`. These are public development defaults, not production credentials. The existing dashboard is teacher-focused and uses teacher-only API endpoints; this project does not currently provide a separate admin dashboard. Do not expose a backend using these defaults to the public internet.

## Build Commands

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend/demo
./mvnw clean package
```

## Environment Notes

The backend configuration currently expects:

- MySQL database: `school_db`
- Backend port: `8080`
- Frontend dev server: `5173`

If your local MySQL credentials differ, update them in the backend properties file before starting the server.

## Contribution

Contributions are welcome. Feel free to fork the repository, make improvements, and submit a pull request.

## License

This project is for educational and institutional use.
# school-website-project
