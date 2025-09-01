📘 Customer Management Frontend

This is the frontend application for the Customer Management System, built using React.js.
It connects to the backend API hosted at:

https://customer-management-backend-1-pvlv.onrender.com/api

🚀 Features

List all customers with pagination & search

View detailed customer information

Add new customers with address details

Edit existing customer data

Delete customers

Success messages for Create/Update actions

🛠️ Tech Stack

React.js (Frontend UI)

Axios / Fetch (API calls)

CSS (Custom styling)

React Router (Page navigation)

📂 Project Structure

src/
│── components/         # Reusable UI components
│   ├── AddressForm.jsx
│   ├── AddressList.jsx
│   ├── CustomerForm.jsx
│   ├── Pagination.jsx
│   └── SearchFilters.jsx
│
│── pages/              # Page-level components
│   ├── CustomerDetailPage.jsx
│   ├── CustomerFormPage.jsx
│   └── CustomerListPage.jsx
│
│── api.js              # Centralized API instance
│── App.js              # Root component
│── index.js            # Entry point
│── styles.css          # Global styles

⚙️ Setup Instructions

1️⃣ Clone Repository
git clone https://github.com/umaGannamani/customer-management-app.git
cd customer-management-app/client

2️⃣ Install Dependencies
npm install

3️⃣ Environment Setup

Create a .env file in the client folder:

REACT_APP_API_URL=https://customer-management-backend-1-pvlv.onrender.com/api

4️⃣ Run Development Server
npm start


App will be available at:
👉 http://localhost:3000
