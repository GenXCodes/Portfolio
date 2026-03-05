# Portfolio Testimonials Backend

A Node.js + Express + MySQL backend API for user-submitted testimonials in the portfolio application.

## Features

- RESTful API for testimonials management
- MySQL database integration
- CORS support for frontend communication
- Automatic avatar generation from names
- Random color assignment from portfolio palette
- User-submitted vs static testimonial differentiation

## Prerequisites

- Node.js 18+
- MySQL 8+ (with MySQL Workbench)
- MySQL credentials (user: root, password: Chuckn0riz)

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Setup

The database will be automatically created when you run the setup script:

```bash
npm run setup-db
```

Or manually create the database:

1. Open MySQL Workbench
2. Connect with credentials:
   - Host: localhost
   - Port: 3306
   - Username: root
   - Password: Chuckn0riz
3. Run the SQL script: `database_setup.sql`

### 3. Environment Configuration

The `.env` file is already configured with:
- Database connection settings
- Server port (3000)
- CORS origin (http://localhost:5174)

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/user` - Get user-submitted testimonials only
- `GET /api/testimonials/static` - Get static testimonials only
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `PATCH /api/testimonials/:id/approve` - Approve testimonial

### Health Check

- `GET /health` - Server health status

## Database Schema

```sql
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  text TEXT NOT NULL,
  avatar VARCHAR(10),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT TRUE,
  is_user_submitted BOOLEAN DEFAULT TRUE
);
```

## Frontend Integration

The frontend React app (running on port 5174) communicates with this backend via:

1. **Fetching testimonials**: `GET http://localhost:3000/api/testimonials`
2. **Submitting testimonials**: `POST http://localhost:3000/api/testimonials`

## Development Notes

- The backend automatically generates avatars from names (e.g., "John Doe" → "JD")
- Colors are randomly selected from the portfolio palette: `#00f5d4`, `#f72585`, `#7209b7`, `#4cc9f0`
- User-submitted testimonials are auto-approved (`is_approved: true`)
- Static testimonials have `is_user_submitted: false`

## Testing

Test the API with curl:

```bash
# Get all testimonials
curl http://localhost:3000/api/testimonials

# Submit a testimonial
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test User","role":"Developer","text":"Great work!"}' http://localhost:3000/api/testimonials
```

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # API controllers
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
├── scripts/            # Database setup scripts
├── .env               # Environment variables
├── package.json       # Dependencies
└── server.js         # Main server file