# BookVault — Library Book Issue & Return Tracker

A beginner-friendly, evaluation-ready full-stack CRUD web application built with **Node.js**, **Express.js**, **MongoDB Atlas (Mongoose ODM)**, and a **Pure HTML & CSS** frontend with a Warm Classic Library aesthetic.

---

## 🏛️ Project Overview

- **Application Name**: BookVault — Library Book Issue & Return Tracker
- **Architecture**: MVC (Model - View - Controller)
- **Backend**: Node.js & Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Frontend**: Pure Semantic HTML5 & CSS3 (Served statically via Express `public` folder; minimal native `fetch()` calls)
- **Styling**: Warm Classic Library theme (Parchment `#FAF6F0`, Deep Forest Green `#1B4332`, Emerald `#059669`, Amber `#D97706`)

---

## 📁 Project Architecture & File Structure

```text
library-book-crud-api/
├── models/
│   └── book.model.js            # Mongoose Schema & Model with validation & timestamps
├── controllers/
│   └── book.controller.js       # Express Controller functions for all CRUD business logic
├── routes/
│   └── book.route.js            # Express Router mapping HTTP verbs to controller functions
├── public/
│   ├── index.html               # Pure HTML interface to Create, Read, Update, & Delete books
│   └── style.css                # Warm Editorial Library CSS theme
├── .env                         # Environment variables (PORT, MONGO_URI)
├── .gitignore                   # Ignores node_modules, .env, and system files
├── index.js                     # Main Express server, static files, MongoDB Atlas connection
├── package.json                 # Project dependencies & scripts (start, dev)
└── README.md                    # University evaluation guide, Postman & GitHub cheat-sheet
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18.x or v20.x+)
- **npm** (v9.x or v10.x+)
- **Git**

### 2. Install Dependencies
Open your terminal in the `library-book-crud-api` folder and run:
```bash
npm install
```

### 3. Configure `.env`
Ensure your `.env` file exists in the root folder with:
```env
PORT=3000
MONGO_URI=mongodb+srv://sahilsheoran393_db_user:pNZLKVO11Md5ZdM1@cluster0.mongodb.net/bookvault?retryWrites=true&w=majority
```
*(If your MongoDB Atlas cluster hostname differs from `cluster0.mongodb.net`, replace it with your actual cluster address from Atlas).*

### 4. Run the Application
For regular production start:
```bash
npm start
```

For development with automatic reload on changes:
```bash
npm run dev
```

### 5. Access the Web Interface
Open your web browser and navigate to:
```text
http://localhost:3000
```

---

## 🍃 MongoDB Atlas Setup Guide (Step-by-Step)

If you need to configure or verify your MongoDB Atlas cluster from scratch:

1. **Sign in to MongoDB Atlas**: Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/).
2. **Create a Free Cluster**: Click **"Create Deployment"** -> Choose the **M0 Free** shared tier -> Select your region (e.g., AWS / Mumbai or closest) -> Click **Create**.
3. **Database User Authentication**:
   - Go to **Database Access** under the *Security* section in the left sidebar.
   - Click **Add New Database User**.
   - Set **Authentication Method**: Password.
   - Set **Username**: `sahilsheoran393_db_user`
   - Set **Password**: `pNZLKVO11Md5ZdM1`
   - Assign Role: **Read and write to any database** (Atlas admin or dbAdminAnyDatabase).
   - Click **Add User**.
4. **Network Access (IP Whitelist)**:
   - Go to **Network Access** under the *Security* section.
   - Click **Add IP Address**.
   - Click **"Allow Access from Anywhere"** (`0.0.0.0/0`) so you can connect from college Wi-Fi / home network.
   - Click **Confirm**.
5. **Get Connection String**:
   - Click **Database** under *Deployment* -> Click **Connect** next to your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the SRV URI which looks like:
     ```text
     mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority
     ```
   - Paste it into `.env`, replace `<username>` and `<password>`, and append `/bookvault` before the `?` query parameter.

---

## 📮 Postman Desktop Testing Guide

Use Postman Desktop to test all 5 REST endpoints during your evaluation:

| # | Operation | HTTP Verb | Endpoint URL | Description | Expected Status |
|---|---|---|---|---|---|
| **1** | **CREATE** | `POST` | `http://localhost:3000/api/books` | Add a new library book | `201 Created` |
| **2** | **READ ALL** | `GET` | `http://localhost:3000/api/books` | Fetch all books (newest first) | `200 OK` |
| **3** | **READ ONE** | `GET` | `http://localhost:3000/api/books/:id` | Fetch single book by MongoDB `_id` | `200 OK` (or `404`) |
| **4** | **UPDATE** | `PUT` | `http://localhost:3000/api/books/:id` | Update book (e.g. Issue/Return) | `200 OK` |
| **5** | **DELETE** | `DELETE` | `http://localhost:3000/api/books/:id` | Remove a book record by `_id` | `200 OK` |

---

### Step-by-Step Postman Test Payloads

#### 1. CREATE Book (`POST /api/books`)
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/books`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select **raw** -> **JSON**:
```json
{
  "bookTitle": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Computer Science",
  "status": "Available",
  "studentRollNo": "None"
}
```
- **Expected Status**: `201 Created`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Book registered successfully",
  "data": {
    "_id": "672...",
    "bookTitle": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Computer Science",
    "studentRollNo": "None",
    "status": "Available",
    "createdAt": "2026-...",
    "updatedAt": "2026-..."
  }
}
```
*(Copy the generated `_id` to test endpoints 3, 4, and 5).*

---

#### 2. READ ALL Books (`GET /api/books`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/books`
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "672...",
      "bookTitle": "Clean Code",
      "author": "Robert C. Martin",
      "genre": "Computer Science",
      "studentRollNo": "None",
      "status": "Available"
    }
  ]
}
```

---

#### 3. READ ONE Book (`GET /api/books/:id`)
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/books/YOUR_BOOK_ID_HERE`
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "data": {
    "_id": "672...",
    "bookTitle": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Computer Science",
    "status": "Available"
  }
}
```

---

#### 4. UPDATE Book (`PUT /api/books/:id`) — Issue to Student
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/books/YOUR_BOOK_ID_HERE`
- **Headers**:
  - `Content-Type`: `application/json`
- **Body**: Select **raw** -> **JSON**:
```json
{
  "status": "Issued",
  "studentRollNo": "23CS045"
}
```
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "672...",
    "bookTitle": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Computer Science",
    "studentRollNo": "23CS045",
    "status": "Issued"
  }
}
```

---

#### 5. DELETE Book (`DELETE /api/books/:id`)
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/books/YOUR_BOOK_ID_HERE`
- **Expected Status**: `200 OK`
- **Expected Response**:
```json
{
  "success": true,
  "message": "Book \"Clean Code\" has been deleted successfully",
  "data": {
    "_id": "672...",
    "bookTitle": "Clean Code"
  }
}
```

---

## 🐙 Git & GitHub Deployment Commands

To push this project to your GitHub account (`sahill-web`):

```bash
# 1. Navigate to the project root
cd /path/to/library-book-crud-api

# 2. Check Git status (verify .env and node_modules are ignored)
git status

# 3. Add all files to staging
git add .

# 4. Commit files with a clear message
git commit -m "feat: complete BookVault MVC CRUD API with warm library UI"

# 5. Set the default branch to main
git branch -M main

# 6. Add your remote GitHub repository
git remote add origin https://github.com/sahill-web/library-book-crud-api.git

# 7. Push to GitHub
git push -u origin main
```

---

## 🎓 University Viva / Evaluation Q&A Cheat Sheet

Prepare for viva questions with these concise answers:

### Q1: What is the MVC architectural pattern?
> **Answer**: MVC stands for **Model-View-Controller**:
> - **Model (`models/book.model.js`)**: Defines the database schema, data validation, and manages interactions with MongoDB.
> - **View (`public/index.html & style.css`)**: The user interface rendered in the browser.
> - **Controller (`controllers/book.controller.js`)**: Houses the application logic; it accepts requests from routes, queries the Model, and returns HTTP JSON responses.

### Q2: Why do we use Mongoose instead of the native MongoDB driver?
> **Answer**: Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides:
> - Strong schema definitions for inherently schemaless MongoDB documents.
> - Built-in data validation (required fields, enums, trim).
> - Middleware hooks and automatic timestamps (`createdAt`, `updatedAt`).

### Q3: What is the purpose of `{ new: true, runValidators: true }` in `findByIdAndUpdate`?
> **Answer**:
> - By default, Mongoose returns the original document *before* the update was applied. Setting `{ new: true }` tells Mongoose to return the newly updated document instead.
> - `{ runValidators: true }` ensures that schema validations (such as enum values) are re-evaluated during an update operation, preventing invalid data from being saved.

### Q4: Explain the difference between HTTP 200 and HTTP 201.
> **Answer**:
> - **200 OK**: The standard response for successful HTTP requests (GET, PUT, DELETE).
> - **201 Created**: Specifically indicates that the request succeeded and resulted in the creation of a new resource on the server (POST).

### Q5: How does Express serve the static HTML/CSS files?
> **Answer**: Using the built-in middleware `app.use(express.static('public'))`. When a client navigates to `http://localhost:3000`, Express automatically looks into the `public` directory and serves `index.html`.
