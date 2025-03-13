# Expense Tracker API

An Express.js & MongoDB-based API for tracking user income and expenses, with authentication and authorization.

---

## 🚀 Features

✅ User authentication (Register, Login, Logout)\
✅ JWT-based authentication middleware\
✅ Income & Expense CRUD operations\
✅ Secure API with protected routes\
✅ MongoDB as the database

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
.ghttps://github.com/ShivamMathtech/Expense_tracker_Expreess_app.git
cd Expense_tracker_Expreess_app.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4️⃣ Start the server

```bash
npm start
```

---

## 📂 Project Structure

```
📦 expense-tracker-api
 ┣ 📂 controllers
 ┃ ┣ 📜 authController.js
 ┃ ┣ 📜 expenseController.js
 ┃ ┗ 📜 incomeController.js
 ┣ 📂 middleware
 ┃ ┗ 📜 authMiddleware.js
 ┣ 📂 models
 ┃ ┣ 📜 Expense.js
 ┃ ┣ 📜 Income.js
 ┃ ┗ 📜 User.js
 ┣ 📂 routes
 ┃ ┣ 📜 authRoutes.js
 ┃ ┣ 📜 expenseRoutes.js
 ┃ ┗ 📜 incomeRoutes.js
 ┣ 📜 server.js
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## 🔐 Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |

---

## 💰 Income Routes

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/incomes`     | Add new income   |
| GET    | `/api/incomes`     | Get all incomes  |
| GET    | `/api/incomes/:id` | Get income by ID |
| PUT    | `/api/incomes/:id` | Update income    |
| DELETE | `/api/incomes/:id` | Delete income    |

---

## 💸 Expense Routes

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/expenses`     | Add new expense   |
| GET    | `/api/expenses`     | Get all expenses  |
| GET    | `/api/expenses/:id` | Get expense by ID |
| PUT    | `/api/expenses/:id` | Update expense    |
| DELETE | `/api/expenses/:id` | Delete expense    |

---

## 🔥 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
