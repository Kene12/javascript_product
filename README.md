# 🛒 JavaScript Product Management System

A full-stack web application for product management built with **Node.js**, **Express**, **MongoDB**, and **React.js**.  
Supports user & admin authentication, product CRUD operations, and a user-friendly interface.

---

## 📁 Project Structure

```
.
├── Server/         # Backend (Express + MongoDB)
│   ├── models/     # Mongoose models
│   ├── routes/     # API routes for auth, product, user management
│   └── server.js   # Entry point
├── client/         # Frontend (React)
│   └── src/pages/  # Login & Products pages
```

---

## 🚀 Features

- 🔐 **User & Admin Authentication** (JWT + cookie-based)
- 🧾 **Role-Based Access Control** (Admin can view/edit all, users see their own)
- 📦 **Product Management**
  - Create, Read, Update, Delete products
- 🌍 **CORS-enabled** API for frontend/backend connection
- ✅ React frontend with form validation & protected route

---

## ⚙️ Setup Instructions

### 🔧 1. Clone Repository

```bash
git clone https://github.com/Kene12/javascript_product.git
cd javascript_product
```

---

### 🛠️ 2. Backend Setup (`Server/`)

```bash
cd Server
npm install
```

> Create a `.env` file in `Server/`:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development / production
```


Start the server:

```bash
npm start
# or use: npx nodemon server.js
```

---

### 💻 3. Frontend Setup (`client/`)

```bash
cd ../client
npm install
npm start
```

> App will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Demo Login Flow

- Login with **username or email + password**
- On success, cookie stores JWT token
- "Go to Products" button navigates to product list

---

## 📸 Screenshots

> 

---

## 📌 Tech Stack

- **Frontend**: React.js, Tailwind (optional styling), fetch API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Auth**: bcryptjs + jsonwebtoken
- **Cross-Origin**: `cors` + `cookie-parser`

---

## 👨‍💻 Developer

- GitHub: [@Kene12](https://github.com/Kene12)

---

## 📄 License

MIT
