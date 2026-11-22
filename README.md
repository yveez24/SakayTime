
# SakayTime

### A Digital Public Transportation Information and Schedule Management System

## About the Project

SakayTime is a transportation information system designed to help commuters access public transportation schedules, routes, terminals, and important travel announcements.

## Technologies Used

- React.js
- Node.js
- Express.js
- SQLite3
- HTML
- CSS
- JavaScript
- Bootstrap

## Project Structure

- `index.html` - Vite HTML entry point
- `src/index.js` - React application entry point
- `src/App.js` - SakayTime homepage
- `src/components/auth/` - Login, signup, session API module, and auth styles
- `public/` - Static assets
- `dist/` - Production frontend build output
- `server/` - Backend and API
- `database/` - SQLite database and SQL schema

## Installation

1. Clone this repository.
2. Install dependencies:

   npm install

3. Configure your environment variables if needed.
4. Copy `.env.example` to `.env` and set `JWT_SECRET` to a long, random value.
5. Initialize the SQLite database with `npm run db:init`.
6. For development, run the API with `npm start` and the frontend with `npm run dev` in separate terminals. Open the Vite URL shown in the terminal (usually `http://localhost:5173`).
7. For production, run `npm run build` and then `npm start`; open `http://localhost:5000`.

## Accounts

The homepage supports commuter registration, login, and logout through the existing `/api/auth/register`, `/api/auth/login`, and `/api/auth/me` endpoints. Passwords must be at least 8 characters. Login sessions are kept in the current browser tab and cleared when you log out.

## Developers

SakayTime Development Team

## Project Status

Under Development
