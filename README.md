# 📚 Library Management System

A Library Management System API built with **Express**, **TypeScript**, and **MongoDB** (via **Mongoose**) using the **MVC (Model-View-Controller)** architectural pattern.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or newer
- **npm** or **yarn**
- **MongoDB** (local or remote)

### Installation

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root:

```
MONGODB_URI=mongodb://localhost:27017/library
PORT=5000
```

> Adjust the MongoDB URI as needed.

### Running the Project

```bash
npm run dev
# or
yarn dev
```

The API server will be running at `http://localhost:5000`.

---

## 🏗️ Project Structure (MVC Pattern)

```
src/
├── controllers/   # Business logic (controllers for each route)
├── models/        # Mongoose schemas and static/instance methods
├── routes/        # Route definitions (Express routers)
├── interfaces/    # Interfaces for models
├── app.ts         # Express app setup
├── server.ts      # App entry point
```

---

## ⚙️ Features

- **Book Management**: Add, update, delete, and fetch books.
- **Borrowing System**: Borrow books (with business rules and validation).
- **Aggregated Borrow Summary**: View borrowing stats using aggregation pipeline.
- **Schema Validation**: Strict validation via Mongoose schemas.
- **Filtering/Sorting**: Find books by genre, sort, and paginate results.
- **MVC Design**: Clean separation of concerns.
- **Error Handling**: Uniform error response structure.
- **Mongoose Features**: Middleware, statics, instance methods.

---

## 🧑‍💻 API Endpoints

All endpoints are prefixed with `/api`.

### 1. Create Book

**POST** `/api/books`

Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

---

### 2. Get All Books

**GET** `/api/books?filter=GENRE&sortBy=FIELD&sort=asc|desc&limit=10`

Query Parameters:

- `filter`: Filter by genre (`FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`)
- `sortBy`: Sort by field (e.g., `createdAt`)
- `sort`: `asc` or `desc`
- `limit`: Number of results (default: 10)

Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```

---

### 3. Get Book by ID

**GET** `/api/books/:bookId`

Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ... }
}
```

---

### 4. Update Book

**PUT** `/api/books/:bookId`

Request example:

```json
{
  "copies": 50
}
```

Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### 5. Delete Book

**DELETE** `/api/books/:bookId`

Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### 6. Borrow a Book

**POST** `/api/borrow`

Request:

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

> Business logic enforced: Checks available copies, decrements, disables availability if depleted. Uses model static/instance methods.

Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

---

### 7. Borrowed Books Summary

**GET** `/api/borrow`

> Aggregation pipeline: Returns total quantity borrowed per book, with title and ISBN.

Response:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

### 8. Generic Error Response

All errors follow this format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": { ... }
}
```

---

## 🏷️ Book Model Fields

| Field       | Type    | Required | Notes                                                              |
| ----------- | ------- | -------- | ------------------------------------------------------------------ |
| title       | string  | Yes      | Book’s title                                                       |
| author      | string  | Yes      | Book’s author                                                      |
| genre       | string  | Yes      | One of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY |
| isbn        | string  | Yes      | Unique                                                             |
| description | string  | No       | Brief summary                                                      |
| copies      | number  | Yes      | Non-negative integer                                               |
| available   | boolean | No       | Defaults to true                                                   |

---

## 📦 Borrow Model Fields

| Field    | Type     | Required | Notes             |
| -------- | -------- | -------- | ----------------- |
| book     | ObjectId | Yes      | Reference to Book |
| quantity | number   | Yes      | Positive integer  |
| dueDate  | date     | Yes      | Date to return by |

---

## 🛠️ Mongoose Features Used

- **Schema validation**
- **Business logic**: static/instance methods for borrow, availability checks
- **Aggregation pipeline**: borrow summary
- **Middleware**: pre/post hooks, e.g., for timestamps, availability
- **Filtering & sorting**: via query params

---

## 📝 License

MIT

---

## 👤 Author

- [Your Name](https://github.com/almamun2b)
