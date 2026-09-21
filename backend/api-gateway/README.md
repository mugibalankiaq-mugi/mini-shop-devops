# API Gateway

MiniShop centralized API Gateway handling routing for all backend microservices.

## Tech Stack
- Node.js
- Express
- http-proxy-middleware

## Setup
1. `npm install`
2. Configure `.env` using `.env.example`
3. Ensure User, Product, and Order services are running on ports 5001, 5002, and 5003 respectively.
4. Start the server with `npm run dev`

## API Endpoints
- `GET /health` - API Gateway health check
- `GET /health/services` - Status check for all upstream services
- `USE /api/users/*` - Proxies to User Service (port 5001)
- `USE /api/products/*` - Proxies to Product Service (port 5002)
- `USE /api/orders/*` - Proxies to Order Service (port 5003)
