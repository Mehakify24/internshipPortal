# 🚀 InternBridge: Premium Internship Management Platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)

**InternBridge** is a modern, enterprise-grade SaaS application designed to connect top student talent with industry leaders. Built with a focus on premium aesthetics and seamless user experience, InternBridge eliminates the friction of traditional job hunting with unified role-based dashboards, interactive Kanban pipelines, and built-in interview preparation modules.

---

## ✨ Key Features

*   **Role-Based Dashboards:** Distinct, secure, and tailored experiences for **Students**, **Recruiters**, and **Admins**.
*   **Interactive Kanban Pipeline:** Recruiters can manage candidates via dynamic stage updates, which reflect instantly on the student's personal application tracker.
*   **Internship Readiness Score:** A gamified algorithm to encourage students to complete their profiles and help recruiters filter high-quality talent.
*   **Interview Preparations Module:** A dedicated interactive library with technical guides, behavioral (STAR) Q&A accordions, and mock interview tools.
*   **Premium UI/UX:** Clean, accessible design system inspired by top SaaS products (Notion, Linear), featuring soft shadows, muted slate palettes, and robust responsive layouts.

---

## 📸 Platform Gallery

Here is a look at the InternBridge platform in action:

![Screenshot 1](internbridge/frontend/image.png)
![Screenshot 2](internbridge/frontend/image-1.png)
![Screenshot 3](internbridge/frontend/image-2.png)
![Screenshot 4](internbridge/frontend/image-3.png)
![Screenshot 5](internbridge/frontend/image-4.png)
![Screenshot 6](internbridge/frontend/image-5.png)
![Screenshot 7](internbridge/frontend/image-6.png)
![Screenshot 8](internbridge/frontend/image-7.png)
![Screenshot 9](internbridge/frontend/image-8.png)
![Screenshot 10](internbridge/frontend/image-9.png)
![Screenshot 11](internbridge/frontend/image-10.png)

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** React 18 via Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v3.4.0) with custom Design Tokens
*   **State Management:** Zustand
*   **Routing:** React Router v6
*   **API Client:** Axios (with automatic JWT Interceptors)

### Backend
*   **Environment:** Node.js & Express.js
*   **Database:** MongoDB (via Mongoose)
*   **Authentication:** JWT (JSON Web Tokens) & bcryptjs for secure hashing
*   **Language:** TypeScript

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB running locally on port `27017`

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd internbridge/backend
npm install
```

Create a `.env` file in the `backend/` root:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/internbridge
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

**Seed the Database:**
To instantly populate the application with premium jobs and mock recruiters, run the seeder:
```bash
npx ts-node src/seed.ts
```

Start the backend server:
```bash
npm run dev
```
*The API will run on `http://localhost:5001`*

### 2. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd internbridge/frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The UI will run on `http://localhost:5174`*

---

## 📖 How to Use

1.  **Student Flow:** Register a Student account. Check out the **Interview Prep** tab to practice your skills. Head to the **Job Board** to view the seeded internships from Google and Netflix. Click **Apply**.
2.  **Recruiter Flow:** Register a Recruiter account. Click **Post New Internship** to add a job to the board. Your **Dashboard** will show a dynamic Kanban board of all students who have applied to your roles. Change their dropdown stage to see them move through your pipeline!

---

*Designed and Developed by the InternBridge Team.*
