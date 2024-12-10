# comp5130

This project consists of a **frontend** and **backend**, each with its own setup and dependencies. The following guide explains how to install, build, test, and run the project.

## Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/), which comes with Node.js

---

## Project Structure

```
root/
├── frontend/   # Contains the frontend React application
├── backend/    # Contains the backend Node.js application
├── package.json # Root package configuration
```

---

## Installation

To install all dependencies for both the **frontend** and **backend**, run:

```bash
npm run install
```

This command:
- Installs dependencies for the frontend (`frontend/` directory).
- Installs dependencies for the backend (`backend/` directory).

---

## Running the Project

To start both the **frontend** and **backend** applications in development mode, run:

```bash
npm start
```

This command:
- Starts the React development server for the frontend.
- Starts the Node.js server for the backend.

The applications will run concurrently.

---

## Building the Project

### Build the Frontend
To build the React frontend for production, run:

```bash
npm run build-frontend
```

The production-ready build will be output in the `frontend/build` directory.

### Build the Backend
If the backend requires a build process, you can build it with:

```bash
npm run build-backend
```

If no backend build script is defined, this command will display a message: `No backend build script found!`.

### Build Both (Optional)
If you want to build both the frontend and backend together, run:

```bash
npm run build
```

---

## Testing the Project

### Test the Frontend
To run tests for the frontend application, run:

```bash
npm run test-frontend
```

### Test the Backend
To run tests for the backend application, run:

```bash
npm run test-backend
```

If no backend tests are defined, the command will display a message: `No backend tests defined!`.

### Test Both
To test both the frontend and backend sequentially, run:

```bash
npm run test
```

---

## Notes
- The `concurrently` package is used to run multiple processes (e.g., frontend and backend) simultaneously.
- You can customize the scripts in `package.json` as per your project needs.

---

## Troubleshooting

- **Dependencies are not installing properly**:
  Ensure you have the correct version of Node.js installed. Try running:
  ```bash
  npm cache clean --force
  npm install
  ```

- **Frontend or backend doesn't start**:
  Verify that the respective `start` scripts in the `frontend` and `backend` directories are correctly defined.

- **Vulnerabilities in dependencies**:
  Run the following to address vulnerabilities:
  ```bash
  npm audit fix
  ```