# SkillBridge Server

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.4-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.18-4169E1?style=for-the-badge&logo=postgresql)

**Live Link**: [SkillBridge Server](https://skill-bridge-server-rubel6623-rubel6623s-projects.vercel.app)

The backend service for the SkillBridge platform, providing a robust, type-safe API for user authentication, data management, and integration with the client application.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database Engine**: PostgreSQL
- **Authentication**: JWT, bcrypt
- **Validation**: Zod

## Key Features
- **RESTful API**: Comprehensive endpoints supporting the student, tutor, and admin interfaces.
- **Role-Based Access Control (RBAC)**: Secure routes for restricted operations like blog management and recruitment.
- **Database Management**: Prisma schema managing users, blogs, subjects, and tasks.
- **Authentication**: Secure login and registration using JWT.
- **Admin Seeding**: Automated scripts to initialize administrative users.

## Public Routes

Here is a list of the public endpoints that do not require authentication:

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/social-login` - Authenticate via Social Login (e.g., Google)

### Blogs (`/api/blogs`)
- `GET /api/blogs` - Get a paginated list of all public blogs
- `GET /api/blogs/categories` - Get all blog categories
- `GET /api/blogs/:id` - Get details of a specific blog

### Tutors & Subjects (`/api`)
- `GET /api/tutors` - Get a list of all tutors
- `GET /api/tutors/:id` - Get details of a specific tutor
- `GET /api/tutor-subjects` - Get all tutor subjects
- `GET /api/tutor-subjects/:id` - Get details of a specific subject

### Categories (`/api`)
- `GET /api/categories` - Get all generic platform categories

### Reviews & Availability (`/api`)
- `POST /api/review` - Submit a new review
- `GET /api/review/tutor/:tutorProfileId` - Get reviews for a specific tutor
- `GET /api/:tutorProfileId` - Get tutor availability

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file based on the required configurations:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/skillbridge"
   JWT_SECRET="your_jwt_secret"
   ```

3. **Database Setup**:
   Generate the Prisma client and push the schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed Admin User** (Optional):
   ```bash
   npm run seed:admin
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. The server will be running on your configured port (e.g., `http://localhost:5000`).
