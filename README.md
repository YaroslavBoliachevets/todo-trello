# Trello Board Clone

A simple Trello-like task management application that allows users to create, edit, and track the progress of tasks across different columns (e.g., "To Do", "In Progress", "Done"). This project is designed to help organize tasks efficiently with a drag-and-drop interface.

## Project Description

This is a web-based task management tool inspired by Trello. It enables users to manage their tasks by adding them to columns, editing their content, and moving them between stages (e.g., from "To Do" to "Done") using a drag-and-drop functionality. The application can operate with a local server for real-time data persistence or fall back to static data for demonstration purposes.

## Features

- **Task Creation**: Add new tasks to any column.
- **Task Editing**: Modify the content of existing tasks.
- **Task Tracking**: Move tasks between columns (e.g., "To Do" → "In Progress" → "Done") using drag-and-drop.
- **Task Deletion**: Remove tasks when they are no longer needed.
- **Offline Mode**: Load initial data from a local file if the server is unavailable.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies and Tools

- **Frontend**:
  - **React**: JavaScript library for building the user interface.
  - **TypeScript**: For type safety and better code maintainability.
  - **Chakra UI**: Component library for styling and layout.
  - **@hello-pangea/dnd**: Library for drag-and-drop functionality.
- **Backend** (optional, depending on your setup):
  - Local server (e.g., Node.js with Express) for data persistence.
- **Other Tools**:
  - **Vite**: Build tool for fast development and bundling.
  - **JSON**: Used for static data storage when the server is offline.

## Architecture and Data Management

The application fetches data from a local server (e.g., `http://localhost:3000/api/board`) if available. If the server is down, it falls back to a static `initialData.json` file located in the project directory. The data structure includes:

- **Columns**: Represent stages of task progress (e.g., "To Do", "In Progress", "Done").
- **Tasks**: Individual task items with an ID and content.

No database is required for the basic setup; data is managed in memory or persisted via the server. For a production environment, you could extend this with a real database (e.g., MongoDB or PostgreSQL).

## Installation and Setup

To run the project locally on your computer and test its functionality (including saving tasks and changing their status), follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <your-repo-url>
   cd trello-board-clone
   ```

2. **Install Dependencies**:
   npm install
3. **Start the Development Server**:
   Without a local server (for demonstration):
   npm run dev
   The app will load static data from initialData.json and allow you to interact with tasks (add, edit, move, delete) in memory.

   With a local server (for persistence):
   Ensure your server is running (e.g., npm run start in the server directory if you have one).
   Update the API URL in App.tsx to match your server (e.g., http://localhost:3000/api/board).
   Run the frontend:
   bash
   npm run dev

4. **Open in Browser**:
   Navigate to http://localhost:5173 (or the port specified by Vite) to see the app.
