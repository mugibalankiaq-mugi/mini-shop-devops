# Product Service

MiniShop Product microservice handling product catalog and inventory.

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Prisma ORM

## Setup
1. `npm install`
2. Configure `.env` using `.env.example`
3. Make sure PostgreSQL is running.
4. Run `npx prisma migrate dev --name init`
5. Start the server with `npm run dev`

## API Endpoints
- `GET /api/products` - Get all products (supports ?search= query and ?category= filter)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product
- `GET /health` - Service health check
