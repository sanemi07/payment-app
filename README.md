# Payment App (MERN + DevOps Week 8)

## Project Overview
Payment App is a full-stack MERN application that implements user authentication, account balance lookup, and peer-to-peer money transfer APIs. The frontend is built with React and communicates with an Express API backed by MongoDB. Authentication is based on JWT, and protected account operations require a valid bearer token. This repository is suitable as a backend-focused portfolio project demonstrating API design, auth middleware usage, and transactional transfer handling.

## Tech Stack
- Frontend: React (Vite), React Router, Axios, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, zod

## Architecture Overview
- The React frontend calls backend endpoints under `/api/v1` using Axios.
- User signup/signin returns a JWT token, which the frontend stores in `localStorage` as `token`.
- Protected backend routes require `Authorization: Bearer <jwt_token>`.
- Account features (`getbalance`, `transfer`) are served by the backend after JWT verification and DB access.

## Backend Architecture Breakdown
### Request path (current structure)
1. `routes` define HTTP endpoints and map request handlers.
2. `middleware/auth.js` validates JWT for protected routes and attaches user identity.
3. Route handlers execute business logic (user auth, profile update, balance lookup, transfer).
4. `models` (`user.model.js`, `account.model.js`) interact with MongoDB via Mongoose.
5. Responses are returned to the frontend as JSON.

### Key backend modules
- `backend/index.js`: Express app bootstrap and route mounting.
- `backend/config/connectdb.js`: MongoDB connection setup.
- `backend/routes/userRoutes.js`: signup/signin/update/filter user endpoints.
- `backend/routes/accontRoutes.js`: balance and transfer endpoints.
- `backend/middleware/auth.js`: JWT-protected route gate.

## Authentication Flow
1. User submits credentials to `POST /api/v1/users/signup` or `POST /api/v1/users/signin`.
2. Backend validates request input and credentials.
3. Passwords are verified/handled with `bcrypt`.
4. Backend signs a JWT and returns it to the client.
5. Frontend stores token in `localStorage` under `token`.
6. Frontend sends token in `Authorization` header for protected endpoints.
7. `auth` middleware verifies JWT before allowing account operations.

## Money Transfer Transaction Flow
The transfer operation should execute as an atomic flow to prevent inconsistent balances:
1. Authenticate sender via JWT middleware.
2. Validate request body (`amount`, recipient id).
3. Confirm sender account exists and has sufficient balance.
4. Confirm recipient account exists.
5. Debit sender account and credit recipient account in one DB transaction/session.
6. Commit transaction on success; abort on any error.
7. Return success response to frontend.

Note: The project already exposes `POST /api/v1/accounts/transfer`; atomicity depends on backend transaction implementation details in code.

## Data Modeling Explanation
The app uses separate collections for `User` and `Account`:
- `User` stores identity and authentication-related fields (name/email/password hash).
- `Account` stores financial state (balance, account ownership mapping).

Why this separation is useful:
- Keeps authentication and financial data concerns isolated.
- Simplifies account-specific queries/updates.
- Makes financial operations easier to reason about and secure independently.

## Error Handling Strategy
Current behavior is primarily basic JSON/error propagation. Production-oriented handling should follow:
- Validate request payloads early (zod) and return `400` for invalid input.
- Return `401/403` for auth failures on protected routes.
- Return `404` for missing entities (for example, recipient account).
- Return `409` or `400` for business-rule failures (for example, insufficient balance).
- Return `500` for unexpected server/database errors.
- Use consistent response envelopes to simplify frontend handling.

## Security Considerations
Implemented:
- Password hashing with `bcrypt`.
- JWT-based authentication for protected routes.
- Request validation with `zod`.
- Bearer token authorization for account routes.

Best-practice improvements (not currently claimed as implemented):
- Move token storage from `localStorage` to secure HTTP-only cookies (mitigates XSS token theft risk).
- Add token expiry handling and refresh-token rotation.
- Add rate limiting and abuse protection on auth endpoints.
- Add centralized audit/security logging for sensitive operations.

## Environment Configuration
Create `backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Prerequisites:
- Node.js 18+
- MongoDB running locally or remotely

## API Base URL
`/api/v1`

## API Reference
### User endpoints
| Method | Endpoint | Protected | Description |
|---|---|---|---|
| POST | `/api/v1/users/signup` | No | Create user account and return JWT |
| POST | `/api/v1/users/signin` | No | Authenticate user and return JWT |
| PUT | `/api/v1/users/` | Yes | Update user profile fields |
| GET | `/api/v1/users/bulk?filter=<name>` | No | Search users by first/last name |

### Account endpoints
| Method | Endpoint | Protected | Description |
|---|---|---|---|
| GET | `/api/v1/accounts/getbalance` | Yes | Fetch authenticated user balance |
| POST | `/api/v1/accounts/transfer` | Yes | Transfer funds to another user |

### Request/response examples
`POST /api/v1/users/signup`

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "firstName": "John",
  "lastName": "Doe"
}
```

`POST /api/v1/users/signin`

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

`PUT /api/v1/users/` (protected)

```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

`POST /api/v1/accounts/transfer` (protected)

```json
{
  "amount": 500,
  "to": "<receiver_user_id>"
}
```

`GET /api/v1/accounts/getbalance` current response shape:

```json
{
  "msg": "your account balance is 1234"
}
```

Suggested production response shape (recommended for API consistency):

```json
{
  "balance": 1234,
  "currency": "INR"
}
```

## Auth Header Example
```http
Authorization: Bearer <jwt_token>
```

## Frontend Flow Explanation
1. User opens `/` (SignUp) or `/signin` (SignIn).
2. On successful auth, frontend stores `token` in `localStorage`.
3. User navigates to `/dashboard`.
4. `Balance` component calls `GET /api/v1/accounts/getbalance` with bearer token.
5. `Users` component fetches searchable users via `/api/v1/users/bulk`.
6. User initiates transfer from `SendMoney`, which posts to `/api/v1/accounts/transfer` with token.

## Folder Structure Explanation
```text
backend/
  config/
    connectdb.js            # Database connection bootstrap
  middleware/
    auth.js                 # JWT verification middleware
  models/
    user.model.js           # User schema/model
    account.model.js        # Account schema/model
  routes/
    userRoutes.js           # User/auth/profile/search endpoints
    accontRoutes.js         # Account balance/transfer endpoints
  index.js                  # Express entrypoint

frontend/
  src/
    components/
      Appbar.jsx
      Balance.jsx
      SendMoney.jsx
      Users.jsx
      ...
    pages/
      SignUp.jsx
      SignIn.jsx
      DashBoard.jsx
      Transfer.jsx
    App.jsx                 # Client-side route configuration
```

## How to Run Locally
### Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deployment Notes
The project is currently configured for local development (`localhost`) based on frontend API calls. If deployed, update frontend API base URL and backend environment variables for production infrastructure.

## Known Limitations
- Automated tests are not configured yet.
- `SendMoney` and `Users` integration is partially wired and can be hardened further.
- Balance response currently returns string-based `msg` rather than a typed numeric balance field.
- Route file is named `accontRoutes.js` (typo in filename), which may reduce maintainability.

## Future Improvements
- Add refresh tokens and token rotation strategy.
- Add rate limiting and brute-force protection for auth endpoints.
- Add unit/integration tests (route, middleware, DB transaction coverage).
- Add centralized logging and request tracing.
- Add Docker support for consistent local/runtime environments.
- Add CI/CD pipeline for linting, test, and deployment automation.
- Improve API response standardization (consistent success/error envelopes).

## Screenshots
Add UI/API screenshots here:
- Signup page
- Signin page
- Dashboard (balance + users)
- Transfer flow (request + success state)
