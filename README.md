# P08 — Campus Transport Management System

A REST API built using **Node.js, Express.js, MongoDB, and Mongoose** to manage campus transport routes, stops, vehicles, and schedules securely.

## Features

- User registration and login with password hashing using bcrypt
- JWT authentication using HTTP-only cookies
- Role-based access control for `USER` and `ADMIN`
- CRUD operations for routes, stops, vehicles, and schedules
- Request validation and Mongoose schema validation
- Centralized error handling with appropriate HTTP status codes
- Users can view active transport information
- Admins can create, update, and delete transport records
- API testing using Postman

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Postman

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/rajithasai28/Campus-Transport-Management.git
cd Campus-Transport-Management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to a new file named `.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/campus_transport
JWT_SECRET=your_long_random_secret
ADMIN_REGISTRATION_SECRET=your_local_admin_secret
NODE_ENV=development
```

Use your own strong secret values. Never upload `.env` to GitHub.

### 4. Start MongoDB

Ensure your local MongoDB service is running.

### 5. Start the server

```bash
npm start
```

The API runs at:

`http://localhost:5000`

Open this URL in a browser to verify that the API is running.

## API Endpoints

Base URL: `http://localhost:5000`

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a user |
| POST | `/api/auth/login` | Public | Log in |
| POST | `/api/auth/logout` | Public | Clear the login cookie |
| GET | `/api/auth/me` | Authenticated | Get current user |
| POST | `/api/auth/register-admin` | Secret required | Register an admin for local testing |

### Transport Management

| Resource | Method | Endpoint | Access |
|---|---|---|---|
| Routes | GET | `/api/routes` | Authenticated |
| Routes | GET | `/api/routes/:id` | Authenticated |
| Routes | POST | `/api/routes` | ADMIN |
| Routes | PUT | `/api/routes/:id` | ADMIN |
| Routes | DELETE | `/api/routes/:id` | ADMIN |
| Stops | GET | `/api/stops` | Authenticated |
| Stops | GET | `/api/stops/:id` | Authenticated |
| Stops | POST | `/api/stops` | ADMIN |
| Stops | PUT | `/api/stops/:id` | ADMIN |
| Stops | DELETE | `/api/stops/:id` | ADMIN |
| Vehicles | GET | `/api/vehicles` | Authenticated |
| Vehicles | GET | `/api/vehicles/:id` | Authenticated |
| Vehicles | POST | `/api/vehicles` | ADMIN |
| Vehicles | PUT | `/api/vehicles/:id` | ADMIN |
| Vehicles | DELETE | `/api/vehicles/:id` | ADMIN |
| Schedules | GET | `/api/schedules` | Authenticated |
| Schedules | GET | `/api/schedules/:id` | Authenticated |
| Schedules | POST | `/api/schedules` | ADMIN |
| Schedules | PUT | `/api/schedules/:id` | ADMIN |
| Schedules | DELETE | `/api/schedules/:id` | ADMIN |

## Example Request

### Create a Route

Method: `POST`

Endpoint: `/api/routes`

Body → raw → JSON:

```json
{
  "routeNumber": "R01",
  "routeName": "Campus North",
  "startPoint": "KPHB",
  "endPoint": "College",
  "distance": 12,
  "status": "ACTIVE"
}
```

Create a route before creating its related stops, vehicles, and schedules. Use the actual MongoDB document IDs for references.

## Testing with Postman

1. Start the backend and MongoDB.
2. Register a user and log in.
3. Create an admin account using the configured admin registration secret.
4. Test route, stop, vehicle, and schedule CRUD operations as an admin.
5. Log in as a normal user and verify that viewing records is allowed while write operations return `403 Forbidden`.
6. Verify the stored records in MongoDB.

## HTTP Status Codes

- `200 OK` — Request completed successfully
- `201 Created` — Record created
- `400 Bad Request` — Invalid input or resource ID
- `401 Unauthorized` — Missing or invalid authentication
- `403 Forbidden` — Insufficient permissions
- `404 Not Found` — Resource or endpoint not found
- `409 Conflict` — Duplicate unique value
