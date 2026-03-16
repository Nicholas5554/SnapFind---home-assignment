# Fullstack Home Assignment

This project is a full-stack Pixabay image gallery built to satisfy the assignment requirements with a React frontend and a Node.js Express backend.

The frontend renders a 3x3 image grid, uses Redux for state management, supports category changes through a modal, shows image details in a second modal, and uses server-driven pagination through `Prev` and `Next` controls.

The backend acts as a clean proxy to the Pixabay API, adds pagination and sorting support, and returns a predictable response shape for the client.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Redux, Axios
- Backend: Node.js, Express, Axios, dotenv, cors
- External API: Pixabay

## Project Structure

```text
back-end/
  app.js
  package.json
  controllers/
    imageController.js
  routes/
    imageRoutes.js

front-end/
  package.json
  src/
    App.jsx
    main.jsx
    app/
      store.js
    components/
      CategoryModal.jsx
      ImageDetailsModal.jsx
      ImageGrid.jsx
      Modal.jsx
    features/
      images/
        imagesSlice.js
```

## Features

- Fetches images from Pixabay before the main React app renders
- Uses Redux as the single source of truth for image state
- Displays the first 9 items in a 3x3 grid
- Supports server-side pagination with `Prev` and `Next`
- Supports category updates through a modal dialog
- Supports image details in a modal on item click
- Supports sorting by oldest or newest 
- Includes backend error handling for invalid requests and upstream API failures

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A valid Pixabay API key

## Environment Variables

Create a `.env` file inside `back-end/` with the following content:

```env
API_KEY=your_pixabay_api_key_here
PORT=5000
```

The frontend uses `http://localhost:5000` by default.

If you want to point the frontend to a different backend URL, create `front-end/.env` with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Installation

Install backend dependencies:

```bash
cd back-end
npm install
```

Install frontend dependencies:

```bash
cd front-end
npm install
```

## Running the Project

Start the backend:

```bash
cd back-end
npm start
```

Start the frontend in a separate terminal:

```bash
cd front-end
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://localhost:5000
```

## Available Scripts

### Backend

```bash
npm start
```

Runs the Express server.

```bash
npm run dev
```

Runs the backend with file watching enabled.

### Frontend

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Serves the production build locally.

## API Endpoints

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok"
}
```

### Get Images By Category

```http
GET /api/images/:category?page=1&sortBy=id
```

Query parameters:

- `page`: page number, starting from `1`
- `sortBy`: `id` or `date`

Example request:

```http
GET /api/images/sports?page=1&sortBy=date
```

Example response shape:

```json
{
  "items": [],
  "category": "sports",
  "page": 1,
  "pageSize": 9,
  "sortBy": "date",
  "totalHits": 500,
  "totalPages": 56
}
```

## Architecture Notes

### Backend

- `app.js` configures Express, CORS, JSON parsing, and route registration
- `routes/imageRoutes.js` defines the image API route
- `controllers/imageController.js` handles Pixabay requests, sorting, pagination, and response formatting

### Frontend

- `main.jsx` dispatches the initial fetch before rendering the app
- `store.js` configures the Redux store
- `imagesSlice.js` stores gallery state and defines the async image-fetching thunk
- `App.jsx` coordinates pagination, sorting, category changes, and modal state
- Reusable UI components live under `src/components`

## Assignment Coverage

This project currently implements the requested core requirements:

- React project setup
- Redux store
- Server call before app render
- 3x3 photo display
- First 9 items only
- `Prev` and `Next` buttons
- Node.js pagination support
- Category-selection modal
- New server request when category changes
- Details modal on image click
- Express REST API
- Sorting and pagination routes through the backend

## Notes

- Pixabay image objects do not expose a dedicated created-at field in this flow, so `date` sorting is currently approximated by sorting image ids in descending order.
- The frontend includes a default category of `sports` for the initial load.

## Validation

The project has been validated with:

- successful frontend production build using `npm run build`
- backend syntax checks using `node --check`
- live API smoke test against `GET /api/images/sports?page=1&sortBy=id`
