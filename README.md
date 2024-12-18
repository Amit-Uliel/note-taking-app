# Note-Taking App

A full-stack note-taking application built with React, Node.js, Express, and MongoDB.

## Features
- Add, edit, delete, and view notes.
- Persistent storage using MongoDB.
- Fully containerized with Docker for easy deployment.

## Prerequisites
- Install [Docker](https://www.docker.com/).

## Setup Instructions
1. Clone the repository:
   `git clone https://github.com/Amit-Uliel/note-taking-app.git`

2. Navigate to the project directory:
    `cd note-taking-app`
    
3.	Start the application using Docker:
    `docker-compose up --build`

4.	Access the application:
	- Frontend: Open http://localhost:5173 in your browser.
	- Backend: API (and the backend server) runs at http://localhost:5001.
	- MongoDB: Runs on localhost:27017. Use a MongoDB client (e.g., Compass) or CLI to connect.

## MongoDB Information
- Default port: `27017`
- MongoDB data is persisted in the Docker volume `mongodb_data`.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker

## Usage
- **Adding Notes**: Use the form on the homepage to add a new note.
- **Editing Notes**: Click the “Edit” button on a note to modify it.
- **Deleting Notes**: Click the “Delete” button to remove a note.

## Tests
The backend includes integration tests for the API, written with Jest and Supertest.

### Running Tests
You can run the tests regardless of whether Docker is running.

1. Navigate to the /backend directory:
    `cd backend`

2. Run the tests:
    - With npx: `NODE_OPTIONS=--experimental-vm-modules npx jest`
    - Or simply by using npm: `npm test`

### What the Tests Cover
- **Create Notes**: Ensures notes can be successfully added.
- **Fetch Notes**: Verifies all notes can be retrieved.
- **Update Notes**: Tests the ability to modify an existing note.
- **Delete Notes**: Ensures notes can be removed and validates their deletion.

### Notes
- Tests use `mongodb-memory-server` to mock a MongoDB database, so they do not interact with your actual database.
- `devDependencies` (like Jest and Supertest) are excluded from the Docker image to keep it lightweight.