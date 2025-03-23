# Myproject_javascript

## Description
This project is a web application built using Node.js, Express, and MongoDB. It includes user authentication with bcryptjs and JSON Web Tokens (JWT). The application allows users to register, log in, and manage their accounts securely.

## Technologies Used
- Node.js
- Express
- MongoDB (Mongoose)
- bcryptjs (for password hashing)
- JSON Web Token (JWT) (for authentication)
- CORS (for handling cross-origin requests)
- dotenv (for managing environment variables)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kene12/Myproject_javascript.git
   cd Myproject_javascript
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Install package nodejs:
   ```env
   npm install express mongoose bcryptjs jsonwebtoken cors dotenv cookie-parser
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- **Register User:** `POST /api/auth/register`
  - Request body:
    ```json
    {
      "username": "exampleUser",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Login User:** `POST /api/auth/login`
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

## Git Commands Used
- Initialize repository:
  ```sh
  git init
  ```
- Add files and commit:
  ```sh
  git add README.md
  git commit -m "commit"
  ```
- Set up remote repository:
  ```sh
  git branch -M main
  git remote add origin https://github.com/Kene12/Myproject_javascript.git
  git push -u origin main
  ```
- Pull latest changes:
  ```sh
  git pull
  ```

## License
This project is licensed under the MIT License.

