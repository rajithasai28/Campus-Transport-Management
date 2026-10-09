# P08 — Campus Transport Management

A secure REST API built with Node.js, Express.js, MongoDB, and Mongoose for managing campus transport routes, stops, vehicles, and schedules.

## Features
- User registration and login with bcrypt password hashing
- JWT authentication using an HTTP-only cookie (Bearer token is also accepted)
- USER / ADMIN role-based access control
- CRUD operations for routes, stops, vehicles, and schedules
- Request validation, Mongoose schema validation, and centralized error handling
- Users can view active transport information; admins can create, update, and delete records
- Postman-friendly JSON responses and meaningful HTTP status codes

## Setup
1. Install Node.js and MongoDB.
2. Open this folder in a terminal and run:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set a long random `JWT_SECRET`.
4. Start MongoDB locally, then run:
   ```bash
   npm start
   ```
5. Open `http://localhost:5000/` to check the API.

## Environment variables
`PORT`, `MONGODB_URI`, `JWT_SECRET`, and optionally `ADMIN_REGISTRATION_SECRET`.

To register an admin for a local demo, set `ADMIN_REGISTRATION_SECRET` in `.env`, then POST to `/api/auth/register-admin` with `name`, `email`, `password`, and `adminSecret`. Never expose this secret or use open admin registration in production.

## Main endpoints
All endpoints except `GET /` and `POST /api/auth/register` and `POST /api/auth/login` require authentication, except logout.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register USER |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/logout` | Public | Clear login cookie |
| GET | `/api/auth/me` | Logged in | Current user |
| GET | `/api/routes` | Logged in | List active routes (ADMIN sees all) |
| GET/POST | `/api/routes/:id` / `/api/routes` | GET: logged in; POST: ADMIN | Read/create route |
| PUT/DELETE | `/api/routes/:id` | ADMIN | Update/delete route |
| GET/POST | `/api/stops` | GET: logged in; POST: ADMIN | List/create stops |
| GET/PUT/DELETE | `/api/stops/:id` | GET: logged in; writes: ADMIN | Read/update/delete stop |
| GET/POST | `/api/vehicles` | GET: logged in; POST: ADMIN | List/create vehicles |
| GET/PUT/DELETE | `/api/vehicles/:id` | GET: logged in; writes: ADMIN | Read/update/delete vehicle |
| GET/POST | `/api/schedules` | GET: logged in; POST: ADMIN | List/create schedules |
| GET/PUT/DELETE | `/api/schedules/:id` | GET: logged in; writes: ADMIN | Read/update/delete schedule |

## Example JSON bodies
Route:
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
Stop:
```json
{ "name": "Main Gate", "location": "College Main Gate", "route": "ROUTE_MONGODB_ID", "sequence": 1, "status": "ACTIVE" }
```
Vehicle:
```json
{ "registrationNumber": "TS09AB1234", "vehicleType": "Bus", "capacity": 40, "route": "ROUTE_MONGODB_ID", "status": "ACTIVE" }
```
Schedule:
```json
{ "route": "ROUTE_MONGODB_ID", "vehicle": "VEHICLE_MONGODB_ID", "departureTime": "08:00", "arrivalTime": "09:00", "days": ["MON", "TUE", "WED", "THU", "FRI"], "availability": 40, "status": "ACTIVE" }
```
Use actual MongoDB document IDs for references.

## Testing
Test registration/login first in Postman. Keep the cookie from login (or use `Authorization: Bearer <token>` if you extract a token in your own client). Then test CRUD endpoints. Create related records in this order: route, stop/vehicle, schedule.

## Notes
- Do not commit `.env` or `node_modules` to GitHub.
- This project is a local learning/hackathon implementation, not a production deployment. Add stricter business-rule checks and automated tests before production use.
