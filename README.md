# To-Do-List-Web-App

## Overview
This is a simple todo list application built using React and Firebase. It allows users to create, edit, delete, and mark tasks as completed. The app provides a clean and intuitive interface for managing tasks effectively.

## Features
- Add new tasks with customizable statuses (To Do, In Progress, Done).
- Edit existing tasks to update their titles.
- Mark tasks as completed or incomplete.
- Delete tasks you no longer need.
- Filter tasks based on their status (All, To Do, In Progress, Done).

![Todo List App](Todolistwebapp.png)

## How to Run
To run the application locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd todo-list`
3. Install dependencies: `npm install`
4. Set up Firebase:
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore database.
   - Obtain your Firebase configuration (API key, auth domain, database URL, etc.).
5. Update Firebase configuration:
   - Replace the placeholder values in `firebase/firebase.js` with your Firebase configuration.
6. Start the development server: `npm start`
7. Open the application in your browser: `http://localhost:3000`


