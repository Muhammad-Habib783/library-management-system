Library Management System

A full-stack library/bookstore management application with a secure RESTful API backend (Node.js, Express, MongoDB) and a React frontend. Built as part of a Backend Development Internship project, extended with JWT authentication and a complete client UI.

Project Overview

This project lets users browse a catalog of books and lets authenticated users manage that catalog (add, update, delete). It started from a "Bookstore CRUD API" brief and grew into a small library system with:


A REST API for full CRUD on books (title, author, price, ISBN, published date, plus category, description, cover image, and availability)
User authentication (register/login) using JWT, with password hashing via bcrypt
Protected routes — creating, updating, and deleting books requires a valid token; browsing books is public
A React frontend with a landing page, login/register screens, and a dashboard for managing the catalog
A seed script to populate the database with sample books


Technologies Used

Backend


Node.js + Express 5
MongoDB + Mongoose (ODM)
JSON Web Tokens (jsonwebtoken) for authentication
bcryptjs for password hashing
dotenv for environment configuration
cors for cross-origin requests
nodemon for development hot-reload


Frontend


React (Create React App)
React Context API for auth state
Font Awesome icons


Project Structure

Library_Management_System/
├── backend/
│   ├── app.js                  # Express app entry point
│   ├── package.json
│   ├── .env                    # Environment variables (not committed)
│   ├── controllers/
│   │   ├── authController.js   # register / login logic
│   │   └── bookController.js   # book CRUD logic
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Book.js             # Book schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification ("protect")
│   ├── seed.js                 # Seeds the database
│   └── seedData.js             # Sample book records
├── frontend/
│   ├── src/
│   │   ├── pages/               # Landing, Login, Register, Dashboard
│   │   ├── context/AuthContext.js
│   │   └── App.js
│   └── package.json
└── README.md

Prerequisites


Node.js v16 or higher
MongoDB — local install or a free MongoDB Atlas cluster
npm (comes with Node.js)


How to Run Locally

1. Get the code

Download or clone this repository, then move into the project folder:

bashcd Library_Management_System

2. Backend setup

bashcd backend
npm install

Create a .env file inside backend/:

envPORT=5000
MONGO_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_secret_key_here


If using MongoDB Atlas, replace MONGO_URI with your Atlas connection string instead of the local one.



Start MongoDB locally if you're not using Atlas:

bashmongod

(Optional) Seed the database with sample books:

bashnpm run seed

Run the backend server:

bashnpm run dev     # development, with auto-restart via nodemon
# or
npm start       # production

The API will be available at http://localhost:5000.

3. Frontend setup

In a separate terminal:

bashcd frontend
npm install
npm start

The React app will open at http://localhost:3000 and communicate with the API at http://localhost:5000.

API Endpoints

Base URL: http://localhost:5000/api

Authentication

MethodEndpointDescriptionAuth requiredPOST/auth/registerCreate a new user accountNoPOST/auth/loginLog in and receive a JWTNo

Register — request body

json{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword"
}

Register — response (201 Created)

json{
  "_id": "665fa1b2c3d4e5f678901234",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Login — request body

You can log in with either your email or your name in the email field:

json{
  "email": "jane@example.com",
  "password": "securepassword"
}

Login — response (200 OK)

json{
  "_id": "665fa1b2c3d4e5f678901234",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

For protected routes, send the token in the Authorization header:

Authorization: Bearer <token>

Books

MethodEndpointDescriptionAuth requiredGET/booksGet all booksNoGET/books/:idGet a single book by IDNoPOST/booksAdd a new bookYesPUT/books/:idUpdate a book's detailsYesDELETE/books/:idDelete a bookYes

Create a book — POST /books

Request body:

json{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "9780735211292",
  "publishedDate": "2018-10-16",
  "category": "Self-Help",
  "description": "An Easy and Proven Way to Build Good Habits",
  "coverImage": "https://example.com/cover.jpg",
  "available": true
}

Response (201 Created):

json{
  "_id": "665fa1b2c3d4e5f678901299",
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "9780735211292",
  "publishedDate": "2018-10-16T00:00:00.000Z",
  "category": "Self-Help",
  "description": "An Easy and Proven Way to Build Good Habits",
  "coverImage": "https://example.com/cover.jpg",
  "available": true,
  "createdAt": "2026-06-21T10:00:00.000Z",
  "updatedAt": "2026-06-21T10:00:00.000Z"
}

Get all books — GET /books

Response (200 OK):

json[
  {
    "_id": "665fa1b2c3d4e5f678901299",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "9780735211292",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "category": "Self-Help",
    "available": true
  }
]

Get a single book — GET /books/:id

Example: GET /books/665fa1b2c3d4e5f678901299

Response (200 OK): same shape as a single book object above.
Response (404 Not Found) if the ID doesn't exist:

json{ "message": "Book not found" }

Update a book — PUT /books/:id

Request body (send only the fields you want to change):

json{
  "price": 18,
  "available": false
}

Response (200 OK): the full updated book object.

Delete a book — DELETE /books/:id

Response (200 OK):

json{ "message": "Book deleted successfully" }

Book Schema

javascript{
  title: String,          // required
  author: String,         // required
  price: Number,          // required
  isbn: String,            // required, unique
  publishedDate: Date,     // required
  category: String,        // default: "General"
  description: String,     // default: ""
  coverImage: String,      // default: ""
  available: Boolean,      // default: true
  createdAt: Date,         // auto-generated
  updatedAt: Date          // auto-generated
}

User Schema

javascript{
  name: String,      // required
  email: String,     // required, unique
  password: String,  // required, stored as a bcrypt hash
  role: String,       // default: "user"
  createdAt: Date,
  updatedAt: Date
}

Testing with Postman

A suggested test sequence:


POST /api/auth/register — create a user
POST /api/auth/login — log in and copy the token from the response
GET /api/books — confirm you can read books without a token
POST /api/books — add a book, with Authorization: Bearer <token> set
GET /api/books/:id — fetch the book you just created
PUT /api/books/:id — update it (with the token)
DELETE /api/books/:id — remove it (with the token)


See POSTMAN_COLLECTION.md in this repo for an importable Postman collection.

Sample cURL Commands

bash# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"securepassword"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"securepassword"}'

# Get all books (no auth needed)
curl http://localhost:5000/api/books

# Create a book (replace TOKEN with the JWT from login)
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"The Alchemist","author":"Paulo Coelho","price":15,"isbn":"9780062315007","publishedDate":"1988-05-01"}'

Security Notes


Passwords are hashed with bcrypt before being stored — plaintext passwords are never saved.
Write operations on books (create/update/delete) require a valid JWT.
.env is excluded from version control via .gitignore — never commit real secrets. The JWT_SECRET shown in this README is a placeholder; use a long, random value in your own .env.