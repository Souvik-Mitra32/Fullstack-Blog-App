# 📝 Full Stack Blog App

A simple full stack blog web application built with **React (frontend)** and **Express + MongoDB (backend)**.  
This project is being built in **3 versions**, each focusing on different aspects of modern web development.

---

## 🚀 Versions

- **v1 (Completed)** – Focused on routes, loaders, and representing API data

  - Users can browse **Posts, Users, Todos, and Comments**
  - React Router used for **nested routes, dynamic routes, loaders**
  - Clean data representation using cards, lists, and detail pages
  - Backend API serves data from `/posts`, `/users`, `/todos`, and related endpoints

- **v2 (Planned)** – Focused on forms and actions

  - Search posts by keywords
  - Filter posts by users
  - Add & edit posts through forms

- **v3 (Planned)** – Focused on clean code & UX improvements
  - Better file structure & maintainability
  - Skeleton loaders for better user experience
  - More polished UI with smooth loading states

---

## 🛠️ Tech Stack

**Frontend (client):**

- React + Vite
- React Router
- Fetch API / Loaders
- Tailwind CSS (optional styling)

**Backend (server):**

- Node.js + Express
- MongoDB + Mongoose
- CORS enabled
- RESTful API design

**Deployment:**

- Frontend → Vercel
- Backend → Render (free tier)

---

## 📂 Project Structure

project-root/
│
├── client/ # React frontend
│ ├── src/
│ └── .env.development
│
├── server/ # Express backend
│ ├── src/
│ └── .env.development
│
└── README.md # You are here

---

## ⚡ Running Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Souvik-Mitra32/Fullstack-Blog-App.git
cd Fullstack-Blog-App
```

### 2️⃣ Setup Backend (server)

```bash
cd server
npm install
npm run dev
```

Create a .env.development file:
PORT=3000
DATABASE_CONNECTION_STRING=<your_mongodb_connection>
ALLOWED_ORIGINS=http://localhost:5173

The API will run on:
👉 http://localhost:3000/api/v1

### 3️⃣ Setup Frontend (client)

```bash
cd ../client
npm install
npm run dev
```

Create a .env.development file:
VITE_BASE_URL=http://localhost:3000/api/v1

The React app will run on:
👉 http://localhost:5173

## 🌍 Deployment

- Frontend (client) → Deploy to Vercel
- Backend (server) → Deploy to Render
- Update your environment variables accordingly:
  Client .env.production & Server Environment Variables (Render Dashboard)

## 🔮 Future Roadmap

- v2 → Forms, actions, searching, filtering, add/edit posts
- v3 → Refactor file structure, add skeleton loaders, clean code improvements

## 📜 License

MIT © 2025 [Souvik Mitra]
