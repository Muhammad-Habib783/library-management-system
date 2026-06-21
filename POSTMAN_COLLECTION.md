# Postman Collection Guide

This document provides instructions to import and test the Library Management API in Postman.

## Quick Import

### Option 1: Manual Setup

1. Open Postman
2. Create a new Collection named "Library Management API"
3. Add the following requests as shown below

### Option 2: Import JSON Collection

Create a file named `Library_Management_API.postman_collection.json` with this content and import into Postman:

```json
{
  "info": {
    "name": "Library Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"securepassword\",\n  \"username\": \"testuser\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/auth/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Login User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"securepassword\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/auth/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Books",
      "item": [
        {
          "name": "Get All Books",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "books"]
            }
          }
        },
        {
          "name": "Get Book by ID",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/books/{{bookId}}",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "books", "{{bookId}}"]
            }
          }
        },
        {
          "name": "Create Book",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Atomic Habits\",\n  \"author\": \"James Clear\",\n  \"price\": 20,\n  \"isbn\": \"9780735211292\",\n  \"publishedDate\": \"2018-10-16\",\n  \"category\": \"Self-Help\",\n  \"description\": \"An Easy and Proven Way to Build Good Habits\",\n  \"coverImage\": \"https://example.com/image.jpg\",\n  \"available\": true\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "books"]
            }
          }
        },
        {
          "name": "Update Book",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              },
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"price\": 18,\n  \"available\": false\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/books/{{bookId}}",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "books", "{{bookId}}"]
            }
          }
        },
        {
          "name": "Delete Book",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/books/{{bookId}}",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "books", "{{bookId}}"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "token",
      "value": ""
    },
    {
      "key": "bookId",
      "value": ""
    }
  ]
}
```

## Testing Workflow

### 1. Register a User
- Open `POST /auth/register`
- Click Send
- Note: Response shows new user created

### 2. Login
- Open `POST /auth/login`
- Click Send
- Copy the `token` from response
- Set Postman environment variable: `{{token}}` = your_token

### 3. Get All Books
- Open `GET /books`
- Click Send
- View all books in database

### 4. Create a Book
- Open `POST /books`
- Verify Authorization header has your token
- Modify the JSON body as needed
- Click Send
- Copy the `_id` from response and save as `{{bookId}}`

### 5. Get Specific Book
- Open `GET /books/{{bookId}}`
- Click Send

### 6. Update a Book
- Open `PUT /books/{{bookId}}`
- Modify the fields you want to update
- Click Send

### 7. Delete a Book
- Open `DELETE /books/{{bookId}}`
- Click Send
- Verify success message

## Setting Environment Variables

1. Click "Environment" in Postman
2. Create new environment "Library-Dev"
3. Add variables:
   - `token`: (paste JWT from login)
   - `bookId`: (paste book ID from create response)

## Sample Data for Testing

Use these test inputs in Postman requests:

**Register User:**
```json
{
  "email": "librarian@bookstore.com",
  "password": "password123",
  "username": "librarian_user"
}
```

**Create Book:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "isbn": "9780743273565",
  "publishedDate": "1925-04-10",
  "category": "Classic Fiction",
  "description": "A classic American novel",
  "available": true
}
```

**Update Book:**
```json
{
  "price": 10.99,
  "category": "Literature",
  "available": false
}
```

## Tips

- Use `GET /books` first to see existing books and their IDs
- Always get fresh token after registering new user
- Delete and update endpoints require valid JWT token
- Check status codes: 200 (OK), 201 (Created), 404 (Not Found), 500 (Server Error)

---

**Ready to test! 🧪**
