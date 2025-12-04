# 🐞 Task Management Backend

A full-featured Task application built with **React.js** for the frontend and **Node.js with Express** for the backend. This application enables users to create, view, edit, and delete tasks efficiently.

## 📌 Project Overview

This Task app provides users with a robust system to manage software tasks. The platform includes:

- **Dashboard** with a list of all issues
- **Detailed View** for each issue
- Full **CRUD** functionality
- **Sorting & Filtering** capabilities
- Responsive and professional **UI**
- RESTful **API** with data persistence

---

## 🛠️ Technologies Used

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Others**: Axios, ESLint, Prettier, dotenv

---

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

#### 1. Clone the repository

```bash

git clone https://github.com/whogoodluck/task-backend

```

#### 2. Setup the backend (server)

```bash

cd task-backend

npm install

```

#### 3. Configure environment variables

- Create a `.env` file inside the `task-backend/` folder

- Add the following:

  ```env

  PORT=3000
  DATABASE_URL=postgresql://username:password@localhost:3306/yourdb
  DEV_DATABASE_URL=postgresql://username:password@localhost:3306/yourdb

  ```

#### 4. Start the backend server

```bash

npm run dev

```

The backend will run on `http://localhost:3001`

#### 5. Backend repository

- [task-backend](https://github.com/whogoodluck/task-backend)
