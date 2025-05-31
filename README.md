# Backend - Value At Void

This is the backend for a job management system, built using Node.js and Express.js. It uses MongoDB as the database and Mongoose for schema modeling.

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **MongoDB** – NoSQL database
- **Mongoose** – ODM (Object Data Modeling) for MongoDB

---

## 📦 Database Schema

A single collection named `jobs` is maintained to handle job-related data. It includes:

- **title**
- **description**
- **profile**
- **experience**
- **employmentType**
- **salary**
- **stats** - contained applied, clicked, and underProcess count
- **postedAt**
- **isHired**

---

### 🚀 Getting Started

## To connect Database 

create a **.env** file inside the root folder and add below variables.

- PORT=5000
- MONGO_URI=mongodb://localhost:27017/assignement-backend-db

## Starting Guide

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd assignment-frontend

2. Install the dependencies:
   ```bash
   npm install

4. Run the development server:
   ```bash
   npm run dev


## TO Create a Initial Jobs use Below reference payload 

{
  "title": "Senior Backend Developer",
  "description": "We’re looking for a Senior Backend Developer (Part Time basis)...",
  "profile": "frontend",
  "experience": "3 - 5 Years",
  "employmentType": "Part-time",
  "salary": "1000 - 1500 INR/hr"
}


**Note**: Not deployed on Varcel due to the MongoDB DB Atlas server not being available for my account.
