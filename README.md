# Full Stack Personal Portfolio

A production-ready full-stack portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). Features include a dynamic layout with Framer Motion animations, dark mode support, and a secure admin dashboard to manage projects and contact messages.

## Features

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Authentication**: Secure JWT-based authentication for the admin dashboard.
- **Admin Dashboard**: Create, update, and delete projects. View contact messages.
- **Contact System**: Saves messages to MongoDB and sends an email via Nodemailer.
- **Security**: Rate limiting, Helmet, CORS configured.
- **UI/UX**: Modern responsive design, loading states, and dark mode.

## Project Structure

```
.
├── backend
│   ├── config       # DB connection
│   ├── controllers  # Business logic
│   ├── middleware   # Auth and Error handling
│   ├── models       # Mongoose models
│   ├── routes       # Express routes
│   ├── seeder.js    # Script to create the initial admin user
│   └── server.js    # Entry point
└── frontend
    ├── src
    │   ├── api        # Axios configuration
    │   ├── components # Reusable UI components
    │   ├── context    # Auth and Theme context
    │   ├── pages      # Page components (Home, Login, AdminDashboard)
    │   ├── App.jsx    # Main layout & routing
    │   └── main.jsx   # React entry point
    └── tailwind.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or Atlas)
- Gmail account (or other SMTP server) for sending emails via Nodemailer

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or configure your `.env` file in the `backend` directory.
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=super_secret_jwt_key_here_change_in_production
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   EMAIL_RECEIVER=your_email@gmail.com
   NODE_ENV=development
   ```
   *Note: For Gmail, you will need to generate an "App Password" to place in `EMAIL_PASS`.*

4. Seed the database with the initial admin user (Credentials: `admin@example.com` / `password123`):
   ```bash
   npm run data:import
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the frontend `.env` by creating a `.env` file in the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment Guide

### MongoDB 
Set up a cluster on **MongoDB Atlas** and grab your connection string. Set this as `MONGODB_URI` in your production environments.

### Backend (Render / Railway)
1. Push your code to GitHub.
2. Link your repository in Render or Railway.
3. Set the Root Directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all environment variables (from your `.env`) to the platform's Environment Variables section.

### Frontend (Vercel / Netlify)
1. Connect your repository to Vercel/Netlify.
2. Set the Root Directory to `frontend`.
3. Set the build command to `npm run build` and output directory to `dist`.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend API URL.
5. Deploy.

Enjoy building your portfolio!
