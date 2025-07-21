# Event Scheduler

A full-stack application for scheduling and managing events with category auto-detection.

## Project Repositories

- [Frontend Repository](https://github.com/ahmed-jobayer/event-scheduler-frontend)
- [Backend Repository](https://github.com/ahmed-jobayer/event-scheduler-backend)

## Features

- Create events with title, date, time, and optional notes
- Auto-categorization of events as "Work", "Personal", or "Other"
- View events sorted by date and time
- Archive events when they're no longer needed
- Delete events
- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Axios for API requests
- React Hook Form for form handling
- SweetAlert2 for notifications

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Zod for validation

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ahmed-jobayer/event-scheduler-backend.git
   cd event-scheduler-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-scheduler
   ```
   *Note: Replace the MongoDB URI with your own connection string.*

4. Start the development server
   ```bash
   npm run start:dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ahmed-jobayer/event-scheduler-frontend.git
   cd event-scheduler-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173 or http://localhost:5174

## API Endpoints

### Events API

- `GET /api/v1/events` - Get all events
- `POST /api/v1/events` - Create a new event
- `PUT /api/v1/events/:id` - Archive an event
- `DELETE /api/v1/events/:id` - Delete an event

## Building for Production

### Backend
```bash
npm run build
npm run start:prod
```

### Frontend
```bash
npm run build
```
The build output will be in the `dist` directory, which can be deployed to any static hosting service.

## Project Structure

### Backend Structure
```
event-scheduler-backend/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   └── event/
│   │   │       ├── event.controller.ts
│   │   │       ├── event.interface.ts
│   │   │       ├── event.model.ts
│   │   │       ├── event.route.ts
│   │   │       ├── event.service.ts
│   │   │       └── event.validation.ts
│   │   └── routes/
│   │       └── index.ts
│   ├── config/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

### Frontend Structure
```
event-scheduler-frontend/
├── src/
│   ├── components/
│   │   ├── AddEventModal.tsx
│   │   ├── EventCard.tsx
│   │   ├── Loading.tsx
│   │   └── NoEvent.tsx
│   ├── types/
│   │   └── Event.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── tsconfig.json
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

