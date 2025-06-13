
# 📝 MERN Todo App

A full-stack Todo application built using the **MERN stack** with **Vite** as the React build tool. This app supports user authentication and lets users manage their personal todo lists.

---

## 🔧 Tech Stack

- **Frontend**: React (with Vite), JSX, CSS, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (localhost)  
- **Authentication**: Custom JWT Middleware  
- **Other Tools**: Supabase Client (optional), ESLint, Vite config  

---

## 📁 Project Structure

```
client/                 → Frontend (React + Vite)
│
├── src/
│   ├── components/     → TodoForm, TodoItem
│   ├── pages/          → Auth, Dashboard, Login, Signup
│   ├── App.jsx
│   ├── main.jsx
│
├── public/
├── App.css
├── package.json
├── vite.config.js

server/                 → Backend (Express + MongoDB)
│
├── models/             → User.js, Todo.js
├── routes/             → auth.js, todos.js
├── middleware/         → auth.js
├── server.js
├── package.json

src/                    → Shared or Global Client Code (optional separation)
├── lib/supabaseClient.js
├── App.jsx
├── main.jsx
├── index.css

scripts/                → Database/SQL scripts (optional)
├── schema.sql

root/
├── tailwind.config.js
├── vite.config.js
├── README.md
```

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Akshith-30/MERN-todo-app.git
cd mern-todo-app
```

### 2. Setup MongoDB

Ensure **MongoDB is installed and running locally**.

Default connection string used:  
`mongodb://localhost:27017/todoApp`

If different, update it in `server/server.js`.

---

## 🛠 Installation & Running

###  Backend Setup

```bash
cd server
npm install
npm start
```

Runs at `http://localhost:5000`

###  Frontend Setup

```bash
cd client
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

##  Authentication

- Signup → `/signup`  
- Login → `/login`  
- JWT is stored in `localStorage`  
- Protected routes with custom middleware  

---

##  Features

- 👤 User Authentication (Signup/Login)  
- ✍️ Create, Read, Update, Delete Todos  
- ⚡ Super-fast React + Vite frontend  
- 🔐 Protected API endpoints  
- 🎨 CSS & TailwindCSS for UI styling  

---

## 📌 Available Scripts

### Client (`client/`)

```bash
npm run dev         # Runs Vite development server
npm run build       # Builds production files
npm run lint        # Lint using ESLint
```

### Server (`server/`)

```bash
npm start           # Starts the backend server
```

---

##  API Endpoints

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| POST   | /api/auth/login     | User login            |
| POST   | /api/auth/signup    | User registration     |
| GET    | /api/todos          | Get all todos         |
| POST   | /api/todos          | Add new todo          |
| PUT    | /api/todos/:id      | Update a todo         |
| DELETE | /api/todos/:id      | Delete a todo         |

---

##  Sample .env (Optional)

Create `.env` in `server/`:

```
MONGO_URI=mongodb://localhost:27017/todoApp
JWT_SECRET=your_jwt_secret
```

---
