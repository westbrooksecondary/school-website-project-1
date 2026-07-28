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
