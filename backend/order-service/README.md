# Order Service

MiniShop Order microservice handling order creation, management, and tracking.

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Prisma ORM

## Setup
1. `npm install`
2. Configure `.env` using `.env.example`
3. Make sure PostgreSQL is running.
4. Run `npx prisma migrate dev --name init` or `npx prisma db push`
5. Start the server with `npm run dev`

## API Endpoints
- `GET /health` - Service health check
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get orders for authenticated user
- `GET /api/orders/:id` - Get order by ID for authenticated user
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order
