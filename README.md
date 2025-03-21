# MERN Authentication & Test System

A full-stack MERN application featuring user authentication and an MCQ-based test system with feedback submission.

## 🔗 Live Demo

[View Live Demo](https://mcqfe.vercel.app/onboard)

## 🚀 Features

- **User Authentication**
  - Registration with full name, email, mobile number, and password
  - Login with mobile number and password
  - Role selection (Student/Employee)
  - JWT token-based authentication

- **MCQ Test System**
  - 5-question multiple-choice test
  - Score calculation (5 marks per question)
  - Results display

- **Feedback System**
  - Emoji-based feedback collection
  - Feedback storage in database

- **Technology**
  - Responsive UI with Tailwind CSS and DaisyUI
  - RESTful API architecture
  - MongoDB data persistence

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS with DaisyUI for styling
- React Router for navigation
- Form validation with Formik and Yup
- Axios for API requests
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS & dotenv for security

## 📋 Prerequisites

- Node.js (v14.0 or later)
- npm or yarn
- MongoDB (local or Atlas)

## 🔧 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/dilshad360/mcq-app
cd mern-auth-test-system
```

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and JWT secret
# Example:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/testapp
# JWT_SECRET=your_jwt_secret
# PORT=5000
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create a .env file if needed for API URL
# Example:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Test
- `GET /api/questions` - Get test questions
- `POST /api/test/submit` - Submit test answers

### Feedback
- `POST /api/feedback` - Submit user feedback

## 📱 App Flow

1. **User Registration/Login**
   - New users register with required information
   - Existing users login with mobile number and password

2. **Test Taking**
   - Users answer 5 multiple-choice questions
   - System calculates total score

3. **Feedback Submission**
   - Users provide emoji-based feedback after test completion

## 🚀 Deployment

The application is deployed on:
- Frontend: [[Vercel](https://mcqfe.vercel.app/)]
- Backend: [[Vercel](https://mcqbe.vercel.app/)]
- Database: MongoDB Atlas

## 🔒 Security Implementations

- Password hashing with bcryptjs
- JWT authentication for protected routes
- Input validation on both client and server
- CORS configuration for API security

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ using the MERN stack