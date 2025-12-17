# Job Board X

A full-stack **Job Board Web Application** where users can register, add skills, and explore job opportunities. Built with **React, Node.js, Express, and MongoDB** to demonstrate authentication, API interaction, and dynamic UI.


## Features
- User registration & login  
- Skill tagging during signup  
- Backend API integration  
- Dynamic job listing view  
- Form validations & error handling  
- Clean and responsive UI

---

##  Tech Stack
| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js (Express) | MongoDB (Atlas / Local) |
| HTML / CSS | REST APIs | Mongoose ODM |

---


##  Installation

### Step 1: Clone the repo
```bash
git clone https://github.com/AnanyaGubba/Job-Board-X.git
cd Job-Board-X
```

### Step 2: Database Setup

1. **Create the database and table:**
   ```bash
   mysql -u root -p
   ```

2. **Run the SQL script:**
   ```sql
    CREATE DATABASE job_board_db;
    USE job_board_db;

    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    skills TEXT NOT NULL
    );

    CREATE TABLE jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      skills_required TEXT NOT NULL,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    
    CREATE TABLE applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      job_id INT,
      user_id INT,
      FOREIGN KEY (job_id) REFERENCES jobs(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  
     
   ```

   Alternatively, use the provided SQL file:
   ```bash
   mysql -u root -p job-board-x < job-board-x. sql
   ```

   ### Step 3: Backend Setup

1. **Navigate to the project root**


2. **Install Application Dependencies
Install the Node.js packages required for the server and React frontend.**
   ```bash
   npm install
   ```

3. **Install Python Requirements
The recommendation engine requires specific data science libraries**:

   ```bash
   pip install pandas numpy scikit-learn
   ```

4. **Configure Environment Variables
Create a .env file in the root directory.**
   ```bash
   touch .env
   ```
Add the following configuration (replace placeholders with your actual values):
  ```bash
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/jobboardx
  JWT_SECRET=your_secure_jwt_secret_key
  ```
 **Running the Application:**
 -  To start the application, you typically need to run the backend server. If the project is set up for concurrent execution, use the start script:
  ```bash
  npm start
  ```
 - Start the backend server
  ```bash
  npm run dev
  ```
 - You should see
  ```bash
  Server running on http://localhost:5000
  ```

5. **Frontend setup:**
   - Navigate To frontend folder
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the react application:
     ```bash
     npm start
     ```
   - Frontend will run at:
     ```bash
     http://localhost:3000
     ```

-----

##  Project Structure

```
Job-Board-X/
├── public/           # Static assets (HTML, favicons, etc.)
├── src/              # React frontend source code (Components, Pages, Hooks)
├── server.js         # Main Entry Point: Express server setup
├── recommend.py      # Python Script: Recommendation logic engine
├── package.json      # Node.js dependencies and scripts
└── package-lock.json # Dependency lock file
└── README.md           # This file
```

---



##  API Endpoints

The backend server provides the following REST API endpoints:

### Get All Reviews
- **Endpoint:** `POST /api/users/register`
- **Description:** Register a new user
- **Request Body:**
  ```bash
  {
  "username": "abcd",
  "password": "password123",
  "skills": "React, JavaScript, Express"
  }
  ```
  ---

### Login User
- **Endpoint:** `POST /api/users/login`
- **Description:** Authenticate user and return JWT token


### Get Job Listings
- **Endpoint:** `GET /api/jobs`
- **Description:** Fetch all available jobs

### Add Job (Future Feature)
- **Endpoint:** `POST /api/jobs/add`
- **Description:** Add a new job (protected route)

-------


## Features In Detail
### Frontend Features
- React Hooks (useState, useEffect)
- Form validation and error handling
- Dynamic UI updates
- Responsive design for multiple devices
### Backemd Features
- RESTful API architecture
- JWT-based authentication
- MongoDB integration using Mongoose
- Input validation and error handling
- Secure password handling
--------

## UI/UX Features
- Clean and minimal design
- Responsive layout
- User-friendly forms
- Clear error messages
- Structured content sections
-----------


## Validation Rules
- **Username:** Required
- **Password:** Required
- **Skills:** Required
- **JWT Token:** Required for protected routes
