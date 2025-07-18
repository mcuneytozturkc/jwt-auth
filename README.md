# JWT Authenticated User Panel

A modern, secure, and multilingual user management panel built with Angular, Express.js, and PostgreSQL.  
Features include registration, login, JWT-based authentication, profile editing, password change, and session management.

## 🚀 Features

- **JWT Authentication** with session expiry
- **User Registration** (email validation, password complexity)
- **Login** with feedback and redirect
- **Profile View/Edit** (update email, full name, birthdate, gender)
- **Password Change** (modal, feedback)
- **Session Timer** and auto logout
- **i18n Support:** English & Turkish (extendable)
- **Responsive UI:** Bootstrap 5
- **Accessibility** best practices
- **Modular Angular Components**
- **PostgreSQL & Express.js Backend**

---

## 🛠️ Tech Stack

- **Frontend:** Angular, Bootstrap 5, ngx-translate, RxJS, TypeScript
- **Backend:** Express.js, PostgreSQL (knex.js), jsonwebtoken, bcryptjs
- **Dev Tools:** ESLint/TSLint, nodemon, pgAdmin

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v13+)

### 1. Clone the project

git clone https://github.com/your-username/jwt-auth-panel.git
cd jwt-auth-panel

### 2. Backend Setup

cd jwt-auth-backend

npm install

##### # Edit your DB config in /db/knex.js or .env

npm run migrate    # (if you have migration scripts)

npm run start

### 3. Frontend Setup

cd jwt-auth-frontend

npm install

ng serve

## 🌍 i18n Support

- **English (`en`)** and **Turkish (`tr`)** included
- Add languages by adding JSON files to `/assets/i18n/`
- Language selector available in the navbar

---

## 👤 Author

[Muhsin Cüneyt ÖZTÜRK](https://github.com/mcuneytozturkc)
