# Blog App - Full Stack Application

This is a full-stack blog application with React frontend and Node.js/Express backend.

## Project Structure

```
.
├── backend/          # Backend API (Node.js + Express + MongoDB)
├── src/              # Frontend React app
├── index.html        # Frontend entry point
├── package.json      # Frontend dependencies
└── vite.config.js    # Vite configuration
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `MONGO_URL`: Your MongoDB connection string
     - `JWT_SECRET_KEY`: A secure secret key for JWT
     - `user_email`: Gmail address for sending OTP emails
     - `user_pass`: Gmail app password (not your regular password)

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate back to root directory:**
   ```bash
   cd ..
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## Features

### Authentication
- ✅ User Registration
- ✅ User Login with JWT
- ✅ Forgot Password with OTP
- ✅ OTP Verification
- ✅ Password Reset

### Blog Management
- ✅ View all blogs (public)
- ✅ View single blog (public)
- ✅ Create blog (authenticated users only)
- ✅ Edit blog (authenticated users only)
- ✅ Delete blog (authenticated users only)

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgotpassword` - Request password reset OTP
- `POST /api/auth/verifyotp` - Verify OTP
- `POST /api/auth/resetpassword` - Reset password

### Blog Routes
- `GET /blogs` - Get all blogs
- `GET /blogs/:id` - Get single blog
- `POST /blog` - Create new blog (requires auth)
- `PATCH /blogs/:id` - Update blog (requires auth)
- `DELETE /blogs/:id` - Delete blog (requires auth)

## Backend Bugs Fixed

The following backend issues were fixed:
1. ✅ Added missing dependencies: `bcrypt`, `jsonwebtoken`, `nodemailer`, `cors`
2. ✅ Added missing imports in `authController.js`
3. ✅ Fixed typo: `autherization` → `authorization` in middleware
4. ✅ Fixed typo: `decode` → `decoded` in middleware
5. ✅ Fixed delete route: `/blogs:id` → `/blogs/:id`
6. ✅ Removed duplicate PATCH endpoint
7. ✅ Added CORS support
8. ✅ Connected auth routes to main app
9. ✅ Added error handling in middleware
10. ✅ Fixed OTP generation (was 5 digits, now 4 digits)

## Technologies Used

### Frontend
- React 18
- React Router DOM (routing)
- Axios (API calls)
- Vite (build tool)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Nodemailer (email service)

## Gmail App Password Setup

To enable password reset functionality:

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account Settings → Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in your `.env` file as `user_pass`

## Notes

- Make sure MongoDB is running before starting the backend
- The frontend proxy is configured to forward `/api` requests to the backend
- JWT tokens are stored in localStorage
- Protected routes require authentication
