# Personal Finance Tracker 💰

A modern **full-stack MERN application** designed to help users manage their finances efficiently by tracking expenses, setting budgets, and visualizing spending patterns through an intuitive dashboard interface.

---

## 📖 Overview

The **Personal Finance Tracker** simplifies personal money management by allowing users to record transactions, categorize expenses, and monitor monthly spending trends in real time.

The application includes:

* **JWT-Based Authentication** – Secure signup and login system
* **Expense Management** – Add, edit, and delete transactions easily
* **Categorized Spending** – Organize expenses into categories like Food, Travel, Shopping, Bills, etc.
* **Dashboard Analytics** – View monthly insights and spending summaries
* **Responsive User Interface** – Optimized for desktop and mobile devices
* **Cloud Database Storage** – MongoDB Atlas integration for secure data persistence

---

## 🚀 Technologies Used

### Backend:

* **Node.js** – JavaScript runtime environment
* **Express.js** – Backend web framework
* **MongoDB Atlas** – Cloud database service
* **Mongoose** – MongoDB object modeling
* **JWT Authentication** – Secure user authentication & authorization

### Frontend:

* **React.js** – Frontend library for UI development
* **Axios** – API communication
* **Context API / useState / useEffect** – State management and lifecycle handling
* **HTML/CSS/JavaScript** – Responsive user interface design

---

## 🔄 Application Flow

1. User creates an account or logs in securely.
2. Transactions are added with amount, category, and date.
3. Expenses are stored in MongoDB Atlas.
4. Dashboard fetches transaction data using REST APIs.
5. Monthly analytics and categorized expense insights are displayed visually.
6. Users can update or delete transactions anytime.

---

## ✨ Key Features

### 🔐 Authentication

* Secure JWT-based login & signup
* Protected routes and user-specific data access

### 💳 Expense Tracking

* Add income and expense transactions
* Edit or delete entries
* Track financial activities daily

### 📊 Dashboard Insights

* Monthly spending summaries
* Category-wise expense tracking
* Financial overview with clean UI

### 📱 Responsive Design

* Mobile-friendly layout
* Smooth and intuitive user experience

---

## 📂 Folder Structure

```bash
PersonalFinanceTracker/
│
├── backend/
│   ├── server.js                # Application entry point
│   ├── routes/                  # API routes
│   ├── models/                  # Mongoose schemas
│   ├── controllers/             # Business logic
│   ├── middleware/              # JWT authentication middleware
│   └── config/                  # Database configuration
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Application pages
│   │   ├── context/             # Context API state management
│   │   ├── services/            # Axios API calls
│   │   ├── styles/              # CSS files
│   │   └── App.js
│
├── .env                         # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-link>
cd PersonalFinanceTracker
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4️⃣ Run the Application

#### Start Backend

```bash
npm start
```

#### Start Frontend

```bash
npm start
```

---

## 📸 Screenshots

<img width="1600" height="782" alt="Screenshot 2025-11-28 234258" src="https://github.com/user-attachments/assets/89992e88-3dba-403f-b0a5-5f257b815174" />
<img width="1212" height="669" alt="Screenshot 2025-11-28 234323" src="https://github.com/user-attachments/assets/57c32dc5-c88c-46a2-8597-1edc5d836869" />
<img width="1888" height="924" alt="Screenshot 2025-11-28 233955" src="https://github.com/user-attachments/assets/91cd2ce6-fe0b-45ac-a95b-96fc14adc20b" />
<img width="1887" height="913" alt="Screenshot 2025-11-28 234158" src="https://github.com/user-attachments/assets/d40a7634-e5f0-498d-b447-96296e571772" />
<img width="1919" height="1016" alt="Screenshot 2025-11-28 233812" src="https://github.com/user-attachments/assets/ae7d705e-3514-4b21-9584-f38d10828005" />
<img width="1887" height="927" alt="Screenshot 2025-11-28 234029" src="https://github.com/user-attachments/assets/b54e4174-605a-4144-8815-05c1e160ddc8" />
<img width="1887" height="1408" alt="Screenshot 2025-11-28 234132" src="https://github.com/user-attachments/assets/08edf43c-de4d-4f70-948d-38a7f90eecc7" />








