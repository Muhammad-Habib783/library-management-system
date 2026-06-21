# Library Management System - RESTful API

A complete bookstore management REST API built with Node.js, Express.js, and MongoDB. This project implements CRUD operations for books with user authentication.

## 📋 Project Overview

This is a backend API for a library management system that allows users to:
- Register and authenticate
- Create, read, update, and delete books
- Manage book inventory with details like title, author, price, ISBN, and publication date
- Secure endpoints with JWT authentication

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment:** dotenv
- **CORS:** Enabled for cross-origin requests
- **Dev Tools:** Nodemon for hot-reloading

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-github-repo-url>
   cd Library_Management_System
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend/` directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library_management
   JWT_SECRET=librarySecretKey123
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas connection string

5. **Run the server**
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

   Server will run on: `http://localhost:5000`

## 📚 API Endpoints

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "username"
}

Response:
{
  "_id": "user_id",
  "email": "user@example.com",
  "username": "username"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

---

### Book Endpoints

#### Get All Books
```
GET /books

Response:
[
  {
    "_id": "book_id",
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 15,
    "isbn": "1234567890",
    "publishedDate": "1988-04-15",
    "category": "Fiction",
    "description": "A philosophical novel",
    "available": true,
    "createdAt": "2026-06-21T10:00:00Z"
  }
]
```

#### Get Single Book by ID
```
GET /books/:id

Example: GET /books/507f1f77bcf86cd799439011

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "9780735211292",
  "publishedDate": "2018-10-16",
  "category": "Self-Help",
  "description": "Build better habits",
  "available": true
}
```

#### Create a New Book ⭐ (Protected)
```
POST /books
Authorization: Bearer <jwt_token>
Content-Type: application/json

Body:
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "9780735211292",
  "publishedDate": "2018-10-16",
  "category": "Self-Help",
  "description": "An Easy and Proven Way to Build Good Habits",
  "coverImage": "https://example.com/image.jpg",
  "available": true
}

Response: (201 Created)
{
  "_id": "new_book_id",
  "title": "Atomic Habits",
  "author": "James Clear",
  ...
}
```

#### Update a Book ⭐ (Protected)
```
PUT /books/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

Example: PUT /books/507f1f77bcf86cd799439011

Body:
{
  "price": 18,
  "available": false
}

Response: (200 OK)
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Atomic Habits",
  ...
  "price": 18,
  "available": false
}
```

#### Delete a Book ⭐ (Protected)
```
DELETE /books/:id
Authorization: Bearer <jwt_token>

Example: DELETE /books/507f1f77bcf86cd799439011

Response: (200 OK)
{
  "message": "Book deleted successfully"
}
```

⭐ **Protected endpoints** require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Book Schema

```javascript
{
  title: String (required),
  author: String (required),
  price: Number (required),
  isbn: String (required, unique),
  publishedDate: Date (required),
  category: String (default: "General"),
  description: String (default: ""),
  coverImage: String (default: ""),
  available: Boolean (default: true),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 🧪 Testing with Postman

1. **Import the API**
   - Create a new collection in Postman
   - Add the endpoints from the list above

2. **Test Authentication**
   - Register a new user at `POST /auth/register`
   - Login at `POST /auth/login` to get JWT token
   - Copy the token from response

3. **Test Book Endpoints**
   - Add token to Authorization header (Bearer scheme) for protected endpoints
   - Use JSON body for POST/PUT requests

4. **Sample test sequence:**
   ```
   1. POST /auth/register → Get user created
   2. POST /auth/login → Get JWT token
   3. GET /books → See all books
   4. POST /books → Create new book (use token)
   5. GET /books/:id → Get specific book
   6. PUT /books/:id → Update book (use token)
   7. DELETE /books/:id → Delete book (use token)
   ```

---

## 🚀 Project Structure

```
Library_Management_System/
├── backend/
│   ├── app.js                 # Main Express app
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   ├── config/                # Configuration files
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   └── Book.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── middleware/            # Custom middleware
│   │   └── authMiddleware.js
│   ├── seed.js                # Database seeding
│   └── seedData.js            # Sample data
├── frontend/                  # React frontend (optional)
└── README.md                  # This file
```

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected write endpoints (POST, PUT, DELETE)
- ✅ CORS configuration
- ✅ Error handling and validation
- ✅ Unique ISBN constraint

---

## 📝 Sample cURL Commands

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"test123","username":"testuser"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"test123"}'

# Get all books
curl http://localhost:5000/api/books

# Create book (replace TOKEN with actual JWT)
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Name","author":"Author","price":20,"isbn":"123","publishedDate":"2026-06-21"}'
```

---

## 🎯 Submission Checklist

- ✅ All 5 API endpoints working
- ✅ MongoDB integration with Mongoose
- ✅ User authentication with JWT
- ✅ Error handling
- ✅ Project structure organized
- ✅ .env for configuration
- ✅ README with documentation
- ✅ Deployed (optional)

---

## 📅 Deadline: 30th June, 2026

---

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements.

## 📄 License

ISC License

---

## 📧 Contact & Support

For issues or questions, create a GitHub issue or contact the project maintainer.

---

**Happy Coding! 🚀**
