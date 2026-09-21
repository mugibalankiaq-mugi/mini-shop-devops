# User Service

MiniShop User microservice handling authentication and user profiles.

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT

## Setup
1. `npm install`
2. Create `.env` from `.env.example`
3. Start Postgres database.
4. Run `npx prisma db push` or `npx prisma migrate dev --name init`
5. Run `npm run dev`

## API Endpoints
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user & get token
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /health` - Health check
